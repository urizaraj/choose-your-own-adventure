const branches = $('#branches')
let res

const curTitle = $('#curTitle')
const curBody = $('#curBody')

$(() => {
  branches.on('click', getBranch)
})

function getBranch(event) {
  event.preventDefault()

  const id = event.target.dataset.id
  const sid = event.target.dataset.sid

  resp = $.get(`/stories/${sid}/branches/${id}`)
  resp.done(data => {
    res = data
    curTitle.text(data.title)
    curBody.text(data.body)
    buildBranches(data.branches)
  })
}

function buildBranches(array) {
  branches.empty()
  array.forEach(branch => {
    let link = $('#hidden').children().clone()
    let h = link.children()
    h[0].dataset.id = branch.id
    h.text(branch.title)
    branches.append(link)
  })
}