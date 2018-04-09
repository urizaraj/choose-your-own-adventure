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
const dynamic = $('#dynamic')

class Application {
  constructor() {
    const data = {
      title: curTitle.text(),
      id: curTitle.data('id'),
      end: false,
      returnable: false
    }

    this.startBranch = new Branch(data)
    this.startBranch.load()
    this.curBranch = this.startBranch
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
  }

  goBack() {
    this.curBranch.parent.load()
  }
}

class Branch {
  constructor(data, parent) {
    this.id = data.id
    this.title = data.title
    this.returnable = data.returnable
    this.end = data.end
    this.parent = parent
    this.url = `/stories/${sid}/branches/${this.id}`
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
    app.curBranch = this
    bpid.val(this.id)
    dynamic.fadeOut(200, () => this.display())
  }

  display() {
    curTitle.text(this.title)
    curBody.text(this.body)
    if (this.end) {
      startOver.show()
      toggleForm.hide()
    } else {
      toggleForm.show()
    }

    this.returnable ? goBack.show() : goBack.hide()
    this.addLinks()
    dynamic.fadeIn(200)
  }

  addLinks() {
    branches.empty()
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