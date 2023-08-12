---
title: This 1 Beginner Trick Will Make You a Better Programmer
description: Code errors are often overlooked by programming beginners. In this article we're demistifying errors and helping you fix them.
date_pub: "2023.08.12"
# date_updated: "2023.01.16"
# draft: false
---

I know it's cliché at this point but what I'm about to tell you will literally take your programming skills to the next level.

Recently a beginner friend of mine started working on a website. He would ocasionally come to me for help with various issues he was having. Most of the time though, I found myself just repeating what the error messages already told him, granted I was doing it in simpler terms.

If all you're doing when your code throws an error is `CTRL Z` and then you write the same thing again, it's time for you to understand what code errors actually mean.

There are 2 types of errors.

1. **Syntax errors**: you spelled something wrong.
2. **Logic errors**: your code works, but not as intended.

## Syntax Errors

Syntax errors are probably the most common type of error you're going to encounter while you're learning the ins and outs of your preffered programming language.

Lucky for you these are also the easiest to fix. Most times you'll get a description of what the issue actually is and you'll be pointed to the problematic line of code.

Take a look at the following error:

```
Uncaught ReferenceError: power is not defined
    <anonymous> file:///home/user/demo.html:17
```

Reading this we already know that the problem has something to do with the word "power" and that the error occurs on line 17 in our demo.html file.

If we look at line 17 in our code, we're going to see the mistake. Instead of logging `pow`, the actual name of the function, to the console, we tried logging `power`.

```js
11	const array = [1, 2, 3];
12
13	const pow = array.map((e) => {
14		return e * e;
15	});
16
17	console.log(power);
```

After we fix our code it will look like this:

```js
11	const array = [1, 2, 3];
12
13	const pow = array.map((e) => {
14		return e * e;
15	});
16
17	console.log(pow);
```

A small, but important change if we want our code to actually run.

Issues won't always be this easy to spot. Your code could and will span across multiple files. Tracking down the exact issue and fixing it might take more time. However, reading and understanding the error message will get you faster to the solution.

## Logic Errors

Logic errors are sneakier. Most times you won't get an explicit error. Your code will run fine. And, from the computer's point of view everything is working as expected.

Computers are great at doing what you tell them to. However, what you **ask for** and what you actually **want** might not always coincide.

Take the following example:

```js
function average(a, b) {
	return a + b / 2;
}

average(1, 2); // 2
```

What we **want** is to return the average of two numbers, what we **get** is, well.. not that.

Due to the opperation order, the function will first divide `b` by 2, and then add `a` to it.

To fix the error all we have to do is put `a` and `b` between paranthesis.

```js
function average(a, b) {
	return (a + b) / 2;
}

average(1, 2); // 1.5
```

Now the computers adds `a` and `b` together before dividing them by 2. In this case the result we **want** and the result we **get** are the same.

To spot logic erros faster you can add tests to your code. To be honest though, I never test my code and I'm doing fine. However, some developers swear by 100% test coverage, so your milage may vary.

## Conclusion

You shouldn't be affraid of errors, you should embrace them. Reading, understanding and acting on code errors is the first step to take if you want to become a better programmer.

I hope that this article gave you a better understanding of how to deal with errors in your code.
