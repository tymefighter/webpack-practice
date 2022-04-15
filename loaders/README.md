# Loaders for .data and .meta files

## What are .data and .meta files ?

The `.data` file stores rows of data, with each row having 
values separated by commas (basically just csv...). But, other
than this, it can also import metadata files (i.e. `.meta` files).
The `.data` file allows for single line comments, which should begin
with `#`. Also, after the metadata imports and before the actual data,
there **must** be a declaration of all the fields present in the data
which follows.

An example file content is as follows, `users.data`:

```
# Metadata imports
meta types.meta
meta all-info.meta

# Fields declaration follows
fields: username,health,damage,speed

# Data follows

tymefighter,330,50,9
jetfighter,200,25,7
EpsilonWarrior,220,20,8
DarkKnight,150,20,5
shadowcharge122,80,5,3
```

The `.meta` file stores metadata about a `.data` file. A `.meta` file
can store any property information about the data. Metadata files can also
import other metadata files, and they also can have single line comments which
begin with `#`. If a meta file defines even a single property, then it must
declare the fields property as well.

The `fields` and `type` metadata properties are special properties used to
reference columns in the data and to assign data types to columns respectively.

Example metadata files follow, `types.meta` and `all-info.meta` respectively:

```
# Fields Metadata - special required property
fields: username,health,damage,speed
# Types metadata - special property
types: String,Int,Int,Int
```

```
meta titles.meta
meta names.meta
meta desc.meta
```
Note: metadata files need not have to define their own metadata, they can possibly 
just import other meta files and still be valid. Such metadata files need not declare
their own fields property.

**Important**: An important thing to know is that `meta` file imports are directory
structure agnostic. Only the name of the file matters, not where it is present in the
source directory.

## What would the loaders do ?

We have two loaders, `data-loader` and `meta-loader` which loads `.data` and
`.meta` files respectively. These two webpack loaders would allow us to use
`.data` and `.meta` files withing javascript !!

Example usage in javascript, `print-users-data.js`:

```javascript

import users from './users.data';

const paddedPrint = value => {
  console.log(`${value}`.padStart(10, ' ')); 
};

const { data, meta } = users;

const fields = Object.keys(meta)

fields.forEach(field => {
  paddedPrint(meta[field].title ?? field)
})

data.forEach(user => {
  fields.forEach(field => {
    paddedPrint(data[field])
  })
})
```
