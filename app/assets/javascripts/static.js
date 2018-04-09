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
})