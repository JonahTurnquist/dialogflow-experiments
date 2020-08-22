import IntentClient from './intent-client'

const intentClient = IntentClient()

intentClient.intent('Order Coffee', (req) => {
  const isCoffeeTypeSlotFilling = req.isSlotFillFor('coffee-type')

  if (isCoffeeTypeSlotFilling)
    return {
      fulfillmentMessages: [
        {
          quickReplies: {
            title: req.getBody().queryResult.fulfillmentText,
            quick_replies: ['latte', 'mocha', 'long black'],
          },
        },
      ],
    }
  else return {}
})

export default intentClient.processRequest
