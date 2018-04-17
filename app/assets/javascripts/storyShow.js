
function initializeStoryShow() {
  class Application {
    constructor() {
      const data = {
        title: storyTitle.data('sbtitle'),
        id: storyTitle.data('sbid'),
        end: false,
        returnable: false
      }
  
      this.startBranch = this.curBranch = new Branch(data)
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
  
    addInitialListeners() {
      toggleForm.on('click', () => formRow.slideToggle(100))
      form.submit(event => this.submitForm(event))
    
      $('#editStory').on('click', event => {
        event.preventDefault()
        const url = event.currentTarget.href
        const resp = $.get(url)
        resp.done(html => {
          $('#modalBody').html(html)
          $('#editModal').modal()
        })
      })

      head.on('click', '#goBack', () => this.goBack())
      head.on('click', '#startOver', () => this.startOver())
    
      $(branch_returnable).on('change', () => {
        if (branch_returnable.checked) {
          branch_end.checked = false
        }
      })
      $(branch_end).on('change', () => {
        if (branch_end.checked) {
          branch_returnable.checked = false
        }
      })
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
      branches = $('#branches')
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
  
  const storyTitle = $('#storyTitle')

  const sid = $('#storyTitle').data('id')
  const form = $('#new_branch')
  const bpid = $('#branch_parent_id')
  const toggleForm = $('#toggleForm')
  const formRow = $('#formRow')
  const dynamic = $('#dynamic')
  const head = $('#head')
  const branch_returnable = $('#branch_returnable')[0]
  const branch_end = $('#branch_end')[0]
  
  const branchLink = Handlebars.compile($('#branchLink').html())
  const branchHead = Handlebars.compile($('#branchHead').html())

  let branches

  const app = new Application()
  app.startBranch.load()
  app.addInitialListeners()
}

$(() => initializeStoryShow())
