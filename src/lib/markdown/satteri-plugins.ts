import Slugger from "github-slugger";
import { defineHastPlugin, defineMdastPlugin } from "satteri";
import type { HastNode, MdastNode } from "satteri";

// ---------------------------------------------------------------------------
// capitalize-headings (mdast)
//
// Port of remark-capitalize: for every heading, apply the `title` (title.sh)
// capitalization transform to each text node, trimming the value first.
// ---------------------------------------------------------------------------

const CONJUNCTIONS = ["for", "and", "nor", "but", "or", "yet", "so"];

const ARTICLES = ["a", "an", "the"];

const PREPOSITIONS = [
	"aboard",
	"about",
	"above",
	"across",
	"after",
	"against",
	"along",
	"amid",
	"among",
	"anti",
	"around",
	"as",
	"at",
	"before",
	"behind",
	"below",
	"beneath",
	"beside",
	"besides",
	"between",
	"beyond",
	"but",
	"by",
	"concerning",
	"considering",
	"despite",
	"down",
	"during",
	"except",
	"excepting",
	"excluding",
	"following",
	"for",
	"from",
	"in",
	"inside",
	"into",
	"like",
	"minus",
	"near",
	"of",
	"off",
	"on",
	"onto",
	"opposite",
	"over",
	"past",
	"per",
	"plus",
	"regarding",
	"round",
	"save",
	"since",
	"than",
	"through",
	"to",
	"toward",
	"towards",
	"under",
	"underneath",
	"unlike",
	"until",
	"up",
	"upon",
	"versus",
	"via",
	"with",
	"within",
	"without",
];

const LOWER_CASE = new Set([...CONJUNCTIONS, ...ARTICLES, ...PREPOSITIONS]);

const SPECIALS = [
	"ZEIT",
	"ZEIT Inc.",
	"CLI",
	"API",
	"Next.js",
	"Node.js",
	"HTTP",
	"HTTPS",
	"JSX",
	"DNS",
	"URL",
	"now.sh",
];

const TITLE_REGEX =
	/(?:(?:(\s?(?:^|[.\(\)!?;:"-])\s*)(\w))|(\w))(\w*[’']*\w*)/g;

const convertToRegExp = (specials: string[]) =>
	specials.map((s) => [new RegExp(`\\b${s}\\b`, "gi"), s] as const);

function parseMatch(match: string): string | null {
	const firstCharacter = match[0];
	if (/\s/.test(firstCharacter)) {
		return match.substr(1);
	}
	if (/[\(\)]/.test(firstCharacter)) {
		return null;
	}
	return match;
}

function titleCase(str: string): string {
	str = str
		.toLowerCase()
		.replace(TITLE_REGEX, (m, lead = "", forced, lower, rest) => {
			const parsedMatch = parseMatch(m);
			if (!parsedMatch) {
				return m;
			}
			if (!forced) {
				const fullLower = lower + rest;
				if (LOWER_CASE.has(fullLower)) {
					return parsedMatch;
				}
			}
			return lead + (lower || forced).toUpperCase() + rest;
		});

	const replace = convertToRegExp(SPECIALS);
	replace.forEach(([pattern, s]) => {
		str = str.replace(pattern, s);
	});

	return str;
}

type TextNode = Extract<MdastNode, { type: "text" }>;

export const capitalizeHeadings = defineMdastPlugin({
	name: "capitalize-headings",
	heading(node, ctx) {
		const visitChildren = (children: readonly MdastNode[]) => {
			for (const child of children) {
				if (child.type === "text" && typeof child.value === "string") {
					const text = child.value.trim();
					ctx.setProperty(child as TextNode, "value", titleCase(text));
				}
				if ("children" in child && Array.isArray(child.children)) {
					visitChildren(child.children as readonly MdastNode[]);
				}
			}
		};
		visitChildren(node.children);
	},
});

// ---------------------------------------------------------------------------
// figure (hast)
//
// Port of rehype-figure: replace a paragraph whose children are images with a
// <figure class="rehype-figure"> (or a <div class="rehype-figure-container">
// when the paragraph holds several images), adding a <figcaption> built from
// the image alt text.
// ---------------------------------------------------------------------------

type HastElement = Extract<HastNode, { type: "element" }>;
type HastElementContent = HastElement["children"][number];

function buildFigure(img: HastElement): HastNode {
	const properties = { ...img.properties };
	const alt = typeof properties.alt === "string" ? properties.alt : "";
	const children: HastElementContent[] = [
		{
			type: "element",
			tagName: "img",
			properties,
			children: [],
		},
	];
	if (alt && alt.trim().length > 0) {
		children.push({
			type: "element",
			tagName: "figcaption",
			properties: {},
			children: [{ type: "text", value: alt }],
		});
	}
	return {
		type: "element",
		tagName: "figure",
		properties: { className: ["rehype-figure"] },
		children,
	};
}

export const figure = defineHastPlugin({
	name: "figure",
	element: {
		filter: ["p"],
		visit(node, ctx) {
			const images = (node.children as HastNode[])
				.filter(
					(c): c is HastElement => c.type === "element" && c.tagName === "img"
				)
				.map(buildFigure);

			if (images.length === 0) return;

			const replacement: HastNode =
				images.length === 1
					? images[0]
					: {
							type: "element",
							tagName: "div",
							properties: { className: ["rehype-figure-container"] },
							children: images as HastElementContent[],
						};

			ctx.replaceNode(node, replacement);
		},
	},
});

// ---------------------------------------------------------------------------
// autolink-headings (hast)
//
// Port of rehype-autolink-headings (behavior: "append", no link properties):
// append <a href="#slug"><span class="mx-2 text-blue-500">#</span></a> to each
// heading. Heading ids are generated with the same github-slugger algorithm
// used by rehype-slug / Astro's built-in heading ids plugin, so the anchors
// match the ids Astro assigns.
// ---------------------------------------------------------------------------

const sluggerKey = "__cocotierAutolinkSlugger";

export const autolinkHeadings = defineHastPlugin({
	name: "autolink-headings",
	element: {
		filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
		visit(node, ctx) {
			const existing = node.properties?.id;
			let slug: string;
			if (typeof existing === "string" && existing.length > 0) {
				slug = existing;
			} else {
				let slugger: Slugger | undefined =
					ctx.data[sluggerKey] instanceof Slugger
						? ctx.data[sluggerKey]
						: undefined;
				if (!slugger) {
					slugger = new Slugger();
					ctx.data[sluggerKey] = slugger;
				}
				slug = slugger.slug(ctx.textContent(node));
				ctx.setProperty(node, "id", slug);
			}

			ctx.appendChild(node, {
				type: "element",
				tagName: "a",
				properties: { href: `#${slug}` },
				children: [
					{
						type: "element",
						tagName: "span",
						properties: { className: ["mx-2", "text-blue-500"] },
						children: [{ type: "text", value: "#" }],
					},
				],
			});
		},
	},
});
