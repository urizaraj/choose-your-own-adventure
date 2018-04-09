const sid = $('#storyTitle').data('id')
const branches = $('#branches')
const curTitle = $('#curTitle')
const curBody = $('#curBody')
const hidden = $('#hidden')
const form = $('#new_branch')
const bpid = $('#branch_parent_id')
const toggleForm = $('#toggleForm')
const formRow = $('#formRow')
const branchLink = Handlebars.compile($('#branchLink').html())
const startOver = $('#startOver')
const goBack = $('#goBack')

class Application {
  constructor() {
    this.sid = $('#storyTitle').data('id')
    let data = {
      title: curTitle.text(),
      id: curTitle.data('id')
    }
    this.curBranch = new Branch(data)
    this.curBranches = branches.children().toArray().map(el => {
      const b = new Branch(el.dataset)
      $(el).on('click', event => {
        event.preventDefault()
        b.load()
      })
      return b
    })
    this.curBranch.branches = this.curBranches
    this.startBranch = this.curBranch
  }

  submitForm(event) {
    event.preventDefault()
    const values = form.serialize()
    const resp = $.post('/stories/1/branches', values)
    resp.done(data => {
      const branch = new Branch(data, this.curBranch)
      branch.addLink()
      form[0].reset()
      formRow.slideToggle(100)
    })
  }

  startOver() {
    this.startBranch.load()
    toggleForm.show()
    startOver.hide()
  }

  goBack() {
    this.curBranch.parent.load()
  }
}

class Branch {
  constructor(data, parent) {
    this.id = data.id
    this.title = data.title
    this.url = `/stories/${sid}/branches/${this.id}`
    this.parent = parent
    this.returnable = data.returnable
    this.end = data.end
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
    if (this.end) {
      startOver.show()
      toggleForm.hide()
    }
    this.addLinks()
    bpid.val(this.id)
  }

  addLinks() {
    branches.empty()
    if (this.returnable) {
      this.parent.addLink()
    }
    this.branches.forEach(b => b.addLink())
  }

  addLink() {
    const html = branchLink(this)
    branches.append(html)
    branches.children().last().on('click', event => {
      event.preventDefault()
      this.load()
    })
  }
}

const app = new Application()

$(() => {
  toggleForm.on('click', () => formRow.slideToggle(100))
  form.submit(event => app.submitForm(event))
  startOver.on('click', () => app.startOver())
  goBack.on('click', () => app.goBack())
})