const mbody = $('#mbody')
const m = $('#m')

$(() => {
  $('.edit').on('click', event => {
    event.preventDefault()
    const url = event.currentTarget.href
    const resp = $.get(url)
    resp.done(data => {
      mbody.html(data)
      m.modal()
    })
  })

  $('.tool').tooltip()
  const body = $('#body')

  for (let i = 1; i < 18; i++) {
    const element = $(`#${i}`)
    element.on('mouseenter', () => {
      body.text(element.data('body'))
    })
    element.on('mouseleave', () => {
      body.text(' ')
    })
  }
})