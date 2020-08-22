export type FulfillmentRequest = {
  responseId: string
  queryResult: QueryResult
  originalDetectIntentRequest: { payload: {} }
  session: string
}

type QueryResult = {
  queryText: string
  parameters: object
  fulfillmentText: string
  fulfillmentMessages: FulfillmentMessage[]
  outputContexts: OutputContext[]
  intent: {
    name: string
    displayName: string
  }
  intentDetectionConfidence: number
  languageCode: string
}

type OutputContext = {
  name: string
  lifespanCount: number
  parameters: object
}

type FulfillmentMessage = { text: { text: string[] } }

export type FulfillmentResponse = any
