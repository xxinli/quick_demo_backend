import { gql } from 'apollo-server-express';

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type AddCompanayMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    company: Company
  }

  input AddCompanyInput {
    name: String
    exchange_symbol: String
  }

  type Query {
    company(keyWord: String): [String]
    price: [String]
    score: [String]
  }

  type Mutation {
    addCompany(post: AddCompanyInput): AddCompanayMutationResponse
  }

  type Company @cacheControl(maxAge: 240) {
    id:   ID @cacheControl(maxAge: 240)
    name: String
    ticker_symbol: String
    exchange_symbol: String
    unique_symbol: String
    date_generated: String
    security_name: String
    exchange_country_iso: String
    listing_currency_iso: String
    canonical_url: String
    unique_symbol_slug: String
    score_id: Score
  }

  type Price @cacheControl(maxAge: 240){
    date:   String
    company: Company
    price: Float
    date_created: String
  }

  type Score @cacheControl(maxAge: 240){
    id:   ID
    company: Company
    date_generated: String
    devidend: Int
    future: Int
    health: Int
    management: Int
    past: Int
    value: Int
    misc: Int
    total: Int
    sentence: String
  }
`;