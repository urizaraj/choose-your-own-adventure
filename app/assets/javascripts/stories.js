const branches = $('#branches')
const curTitle = $('#curTitle')
const curBody = $('#curBody')
const sid = 1

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
  }

  load() {
    let resp = $.get(`/stories/${sid}/branches/${this.id}`)
    resp.done(data => {
      this.body = data.body
      this.branches = data.branches.map(b => {
        const id = b.id
        const title = b.title
        return new Branch(id, title)
      })
      this.display()
    })
  }

  display() {
    curTitle.text(this.title)
    curBody.text(this.body)

    app.curBranches = this.branches
    this.addLinks()
    setBranchListeners()
  } 

  addLinks() {
    branches.empty()
    this.branches.forEach(b => {
      let link = $('#hidden').children().clone()
      link[0].dataset.id = b.id
      let h = link.children()
      h.text(b.title)
      branches.append(link)
    })
  }
}

const app = new Application()

$(() => {
  setBranchListeners()
})

function setBranchListeners() {
  branches.children().toArray().forEach(a => {
    $(a).on('click', event => app.getBranch(event))
  })
}