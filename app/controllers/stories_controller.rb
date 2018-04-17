class StoriesController < ApplicationController
  before_action :set_story, only: %i[show edit update destroy]
  before_action :require_user, only: %i[new create]
  before_action :require_right_user, only: %i[edit update destroy]

  helper_method :same_user

  def index
    @stories = Story.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @stories }
    end
  end

  def show
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

  def edit
    start_branch = @story.start_branch
    render partial: 'form', locals: { story: @story, start_branch: start_branch }
  end

  def update
    @story.update(strong_params)
    redirect_to story
  end

  def destroy
    @story.destroy
    redirect_to stories_path
  end

  private

  def set_story
    @story = Story.find(params[:id])
  end

  def strong_params
    params
      .require(:story)
      .permit :id,
              :title,
              :description,
              start_branch_attributes: %i[id title body]
  end

  def require_right_user
    return head(:forbidden) unless same_user
  end

  def same_user
    @story.user == current_user || admin?
  end
end
