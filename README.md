# Journal- React Native, GraphQL with Apollo and [Graph.cool (hosted DB CMS)]([https://www.graph.cool/)

#### Setting up GraphCool
* go to [graph.cool](https://www.graph.cool/) and setup your account
* create new project and insert DB Schema provided below
* 


##### DB Schema
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
