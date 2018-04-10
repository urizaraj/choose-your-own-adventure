module StoriesHelper
  def story_date(story)
    "created #{story.created_at.strftime '%B %-d, %Y'}"
  end
end
