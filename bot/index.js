module.exports = function(bp) {
  bp.middlewares.load()
  bp.hear(/hello/i, (event, next) => { // We use a regex instead of a hardcoded string
    const first_name = event.user.first_name

    bp.messenger.sendText(event.user.id, 'Hello, ' + first_name, { typing: true })
  })
  bp.hear(/help/i, (event, next) => {
    const options = {
      quick_replies: [{
                content_type: "text",
                title: "Test IQ",
                payload: "HELP_OPTION_1"
            }, {
                content_type: "text",
                title: "Ask questions",
                payload: "HELP_OPTION_2"
            }],
            typing: true,
            waitRead: true // `waitDelivery` or `waitRead` options
    }
    const text = 'Am I stupid?'
    bp.messenger.sendText(event.user.id,text,options)
        .then(() => {

        })
  })

  bp.hear(/stupidme/i, event => {
    const type = 'image' //audio , file, image, video
    const img_url = ''
    bp.messenger.sendAttachment(event.user.id,type, img_url)
  })

  bp.hear(/smartme/i,event => {
    const payload = {
        template_type: "button",
        text: "stupid profile",
        buttons: [
            {
                type: "web_url",
                url: "",
                title: ""
            },
            {
                type: "web_url",
                url: "",
                title: ""
            },{
                type: "web_url",
                url: "",
                title: ""
            },
        ]
    }

    bp.messenger.sendTemplate(event.user.id, payload, { typing: true })
})
}