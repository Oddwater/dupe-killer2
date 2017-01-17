# DupeKiller2

## Demo
https://oddwater.github.io/dupe-killer2

## Browser Compatibility
This was tested on Chrome, Edge, an Android tablet, and an Android phone. It is likely that it works on other major browsers as well.

## Source Code
Relevent code is in the src/app directory. The filtering code is in "initListData" in display.component.ts.

## Performance
Upon pressing the Generate button, several things happen. Many random email addresses are created, which takes longer than the duplicate filtering.

Performance for the duplicate filtering routine is measured in isolation and displayed at the bottom of the page.

## Unit tests
A very abbreviated unit test suite is in display.component.spec.ts. It only tests duplicate filtering and occurrence counts.

## Original Version
The first version I did allowed addresses to be pasted in or directly edited. It included routing and several views.
Performance suffered greatly due to a textarea, which starts behaving badly after around 10k entries. It is included
here for reference only.

https://oddwater.github.io/dupe-killer
