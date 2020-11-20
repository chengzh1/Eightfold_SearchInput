# Demo - Autocomplete search input for movie title

This project is a demo of autocomplete input for Eightfold team

## Instruction

Follow the instruction to setup and run the app:

- `cd $DIRECTORY/demo-app`
- `npm install`
- `npm start`
- (optionally run test) `npm test`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Component Design Spec

- The main component is `demo-app/src/components/AutocompleteInput`, which meeting
the requirement of the home code test.
- Sub components are `Dropdown`, `Highlighter` and `Pill` in the components, they are
all designed to be reuseable, stateless component.
- service, util and constants are separate to their own folders.
- For the simplicity consideration, this demo app use self-rewritten util,
e.g, `util/classNames.js`, in real product, these kind of util should either use
3rd party lib or a more general util function.
- Some simple tests are written, which can be further extended for coverage.

# Highlights of AutocompleteInput component
- Debounce input to reduce the unnecessary api calls
- Movie info is cached in `MovieService.js` to improve search performance
- Load more button to load 10 more results if there are many results
- User friendly error message for invalid case
- Responsiveness style  