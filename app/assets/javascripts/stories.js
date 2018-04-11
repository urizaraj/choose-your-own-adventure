const storyTitle = $('#storyTitle')

const sid = $('#storyTitle').data('id')
const form = $('#new_branch')
const bpid = $('#branch_parent_id')
const toggleForm = $('#toggleForm')
const formRow = $('#formRow')
const dynamic = $('#dynamic')
const head = $('#head')
const branchLink = Handlebars.compile($('#branchLink').html())
const branchHead = Handlebars.compile($('#branchHead').html())

let branches

class Application {
  constructor() {
    const data = {
      title: storyTitle.data('sbtitle'),
      id: storyTitle.data('sbid'),
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
    const resp = $.post(`/stories/${sid}/branches`, values)
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

  addListeners() {
    $('#goBack').on('click', () => app.goBack())
    $('#startOver').on('click', () => app.startOver())
    branches = $('#branches')
  }
}

class Branch {
  constructor(data, parent) {
    const attributes = ['id', 'title', 'returnable', 'end', 'user']
    attributes.forEach(attribute => {
      this[attribute] = data[attribute]
    })
    this.parent = parent
    this.url = `/stories/${sid}/branches/${this.id}`
  }

  load() {
    let resp = $.get(this.url)
    resp.done(data => this.parse(data))
  }

  parse(data) {
    this.body = data.body.split('\n')
    this.branches = data.branches.map(b => {
      return new Branch(b, this)
    })
    this.user = data.user
    app.curBranch = this
    bpid.val(this.id)
    dynamic.fadeOut(200, () => this.display())
  }

  display() {
    this.end ? toggleForm.hide() : toggleForm.show()
    const html = branchHead(this)
    head.html(html)
    app.addListeners()
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
    $(`#b-${this.id}`).on('click', event => {
      event.preventDefault()
      this.load()
    })
  }
}

const app = new Application()

$(() => {
  toggleForm.on('click', () => formRow.slideToggle(100))
  form.submit(event => app.submitForm(event))

  $('#editStory').on('click', event => {
    event.preventDefault()
    const url = event.currentTarget.href
    const resp = $.get(url)
    resp.done(html => {
      $('#modalBody').html(html)
      $('#editModal').modal()
    })
  })
})