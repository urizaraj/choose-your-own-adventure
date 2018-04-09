class Application {
  constructor() {
    this.stories = []
    this.i = 0
  }

  getStories() {
    const resp = $.get('/stories.json')
    resp.done(stories => {
      this.stories = stories.map(data => new Story(data))
      this.stories[0].display()
    })
  }

  next() {
    if (this.i < this.stories.length - 1) {
      this.i += 1
    } else {
      this.i = 0
    }
    this.stories[this.i].display()
    
  }

  previous() {
    if (this.i > 0) {
      this.i -= 1
    } else {
      this.i = this.stories.length - 1
    }
    this.stories[this.i].display()
  }

}

class Story {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.url = `/stories/${this.id}`
    this.endings = data.branches.reduce((a, c) => (a + (c.end ? 1 : 0)), 0)
  }

  display() {
    const html = storyDetail(this)
    curStory.html(html)
  }
}

const app = new Application()
const storyDetail = Handlebars.compile($('#storyDetail').html())
const curStory = $('#curStory')

$(() => {
  app.getStories()
  $('#next').on('click', () => app.next())
  $('#previous').on('click', () => app.previous())
})