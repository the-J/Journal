# Journal - Simple App for creating notes

### React Native, Native-Base, GraphQl with Apollo and graph.cool

![tipCalculator](assets/journal.gif)

* graph.cool Email-Password Auth
* handles graph.cool server errors
* allows to add, edit and remove created notes

### Setting up GraphCool
* [Graph.cool (hosted DB CMS)]([https://www.graph.cool/)
* setup your account
* create new project and insert DB Schema provided below
* probably provide some user access restrictions on posts API
* update App.js to match your key
```js
const httpLink = new HttpLink({
    uri: 'XXXXXXXXX'
});
```

#### DB Schema
```graphql
type File @model {
  contentType: String!
  createdAt: DateTime!
  id: ID! @isUnique
  name: String!
  secret: String! @isUnique
  size: Int!
  updatedAt: DateTime!
  url: String! @isUnique
}

type Post @model {
  body: String!
  id: ID! @isUnique
  title: String!
  createdAt: DateTime!
  user: User! @relation(name: "PostOnUser")
}

type User @model {
  createdAt: DateTime!
  id: ID! @isUnique
  updatedAt: DateTime!
  email: String @isUnique
  password: String
  posts: [Post!]! @relation(name: "PostOnUser")
}
```
