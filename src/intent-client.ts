import { FulfillmentRequest, FulfillmentResponse } from './types'
import { RequestHandler, Request } from 'express'

type IntentHandler = (
  req: ReturnType<typeof getRequestObject>
) => FulfillmentResponse
type IntentMap = Record<string, IntentHandler>

const IntentClient = () => {
  const intents: IntentMap = {}

  const processRequest: RequestHandler = (
    req: Request<{}, any, FulfillmentRequest, {}>,
    res
  ) => {
    const intentName = req.body.queryResult.intent.displayName

    const intent = intents[intentName]

    if (intent) {
      res.send(intent(getRequestObject(req.body)))
    } else {
      console.debug('No intent registered for', intentName)
    }
  }

  return {
    intent(name: string, func: IntentHandler) {
      intents[name] = func
    },
    processRequest,
  }
}

const getRequestObject = (reqBody: FulfillmentRequest) => {
  return {
    isSlotFillFor(entity: string) {
      return reqBody.queryResult.outputContexts.find((c) =>
        c.name.endsWith('dialog_params_' + entity)
      )
    },
    getBody() {
      return reqBody
    },
  }
}

export default IntentClient
