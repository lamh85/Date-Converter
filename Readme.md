# Example Flows

## Easiest example
```
'September 1, 2020'
```

Obvious checks
* Is there a month name?
* Is there a number that is more than 2 digits?
* Is there a comma?

## Most difficult example

```
01/01/01
```

Checks
* Number that is > 31 is year
* Number that is > 12 is day
* If two numbers are the same, then safe. EG: 01/01 is January 1.
* 