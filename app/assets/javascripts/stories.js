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
    this.sid = $('#storyTitle').data('id')
    let data = {
      title: curTitle.text(),
      id: curTitle.data('id')
    }
    this.curBranch = new Branch(data)
    this.curBranches = branches.children().toArray().map(el => {
      // const data = {
      //   id: el.dataset.id,
      //   title: el.text
      // }
      const b = new Branch(el.dataset)
      $(el).on('click', () => b.load())
    })
    this.curBranch.branches = this.curBranches
  }

  getBranch(event) {
    event.preventDefault()
    const id = event.currentTarget.dataset.id
    this.curBranches.find(b => b.id == id).load()
  }
}

class Branch {
  constructor(data, parent) {
    this.id = data.id
    this.title = data.title
    this.url = `/stories/${sid}/branches/${this.id}`
    this.parent = parent
    this.returnable = data.returnable
  }

  load() {
    let resp = $.get(this.url)
    resp.done(data => this.parse(data))
  }

  parse(data) {
    this.body = data.body
    this.branches = data.branches.map(b => {
      return new Branch(b, this)
    })
    this.display()
  }

  display() {
    curTitle.text(this.title)
    curBody.text(this.body)
    app.curBranch = this
    app.curBranches = this.branches
    this.addLinks()
    bpid.val(this.id)
  }

  addLink() {
    const html = branchLink(this)
    branches.append(html)
    branches.children().last().on('click', event => {
      event.preventDefault()
      this.load()
    })
  }

  addLinks() {
    branches.empty()
    if (this.returnable) {
      this.parent.addLink()
    }
    this.branches.forEach(b => b.addLink())
  }
}

const app = new Application()

$(() => {
  // branches.children().toArray().forEach(a => {
  //   $(a).on('click', event => app.getBranch(event))
  // })

  toggleForm.on('click', () => formRow.slideToggle(100))

  form.submit(event => {
    event.preventDefault()
    const values = form.serialize()
    const resp = $.post('/stories/1/branches', values)
    resp.done(data => {
      appendBranch(data)
      form[0].reset()
      formRow.slideToggle(100)
    })
  })
})

function appendBranch(data) {
  const branch = new Branch(data, app.curBranch)
  branch.addLink()
}