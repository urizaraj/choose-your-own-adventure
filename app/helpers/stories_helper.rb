module StoriesHelper
  def story_head(story)
    tag.h1 story.title,
           id: 'storyTitle',
           class: 'mb-0',
           data: {
             id: story.id,
             sbid: story.start_branch.id,
             sbtitle: story.start_branch.title
           }
  end
end
