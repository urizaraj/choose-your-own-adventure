class StoriesController < ApplicationController
  before_action :require_user, only: %i[new create]

  def index
    @stories = Story.all
  end

  def show
    @story = Story.find(params[:id])
  end

  def new
    @story = Story.new
    @branch = @story.build_start_branch
  end

  def create
    story = Story.new(strong_params)
    branch = story.start_branch
    story.user = current_user
    branch.user = current_user
    branch.story = story
    return render :new unless story.save
    redirect_to stories_path
  end

  def strong_params
    params
      .require(:story)
      .permit(:title, :description, start_branch_attributes: %i[title body])
  end
end
