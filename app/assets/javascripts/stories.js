const sid = 1
const branches = $('#branches')
const curTitle = $('#curTitle')
const curBody = $('#curBody')
const hidden = $('#hidden')
const form = $('#new_branch')
const bpid = $('#branch_parent_id')
const toggleForm = $('#toggleForm')
const formRow = $('#formRow')
const branchLink = Handlebars.compile($('#branchLink').html())

class Application {
  constructor() {
    this.curBranches = branches.children().toArray().map(el => {
      const id = el.dataset.id
      const title = el.text
      return new Branch(id, title)
    })
  }

  getBranch(event) {
    event.preventDefault()
    const id = event.currentTarget.dataset.id
    this.curBranches.find(b => b.id == id).load()
  }
}

class Branch {
  constructor(id, title) {
    this.id = id
    this.title = title
    this.url = `/stories/${sid}/branches/${this.id}`
  }

  load() {
    let resp = $.get(this.url)
    resp.done(data => this.parse(data))
  }

  parse(data) {
    this.body = data.body
    this.branches = data.branches.map(b => {
      const id = b.id
      const title = b.title
      return new Branch(id, title)
    })
    this.display()
  }

  display() {
    curTitle.text(this.title)
    curBody.text(this.body)

    app.curBranches = this.branches
    this.addLinks()
    bpid.val(this.id)
  }

  addLinks() {
    branches.empty()
    this.branches.forEach(b => {
      const html = branchLink(b)
      branches.append(html)
      branches.children().last().on('click', event => {
        event.preventDefault()
        b.load()
      })
    })
  }
}

const app = new Application()

$(() => {
  branches.children().toArray().forEach(a => {
    $(a).on('click', event => app.getBranch(event))
  })

  toggleForm.on('click', () => formRow.slideToggle(100))

  form.submit(event => {
    event.preventDefault()
    const values = form.serialize()
    const resp = $.post('/stories/1/branches', values)
    resp.done(data => {
      console.log('yeah, it worked', data)
    })
  })
})