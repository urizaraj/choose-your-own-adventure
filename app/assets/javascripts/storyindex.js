class Application {
  constructor() {
    this.stories = []
    this.i = 0
  }

  getStories() {
    const resp = $.get('/stories.json')
    resp.done(stories => {
      this.stories = stories.map(data => new Story(data))
      this.displayCurStory()
    })
  }

  next() {
    if (this.i < this.stories.length - 1) {
      this.i += 1
    } else {
      this.i = 0
    }
    this.displayCurStory()
  }

  previous() {
    if (this.i > 0) {
      this.i -= 1
    } else {
      this.i = this.stories.length - 1
    }
    this.displayCurStory()
  }

  displayCurStory() {
    curStory.fadeOut(200, () => {
      this.stories[this.i].display()
      curStory.fadeIn(200)
    })
    
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
const storyCard = $('#storyCard')

$(() => {
  app.getStories()
  $('#next').on('click', () => app.next())
  $('#previous').on('click', () => app.previous())
})