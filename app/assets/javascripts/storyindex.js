class Application {
  constructor() {
    this.stories = []
    this.i = 0
  }

  getStories() {
    const resp = $.get('/stories.json')
    resp.done(stories => {
      this.stories = stories.map(data => new Story(data))
      // this.displayCurStory()
      this.stories[0].display()
      $('#none').fadeIn(200)
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
    this.endings = this.endingsString(data.branches)
  }

  display() {
    const html = storyDetail(this)
    curStory.html(html)
  }

  endingsString(array) {
    const n = array.reduce((a, c) => (a + (c.end ? 1 : 0)), 0)
    switch (n) {
      case (0):
        return 'No Endings'
      case (1):
        return '1 Ending'
      default:
        return `${n} Endings`
    }
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