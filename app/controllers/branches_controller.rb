class BranchesController < ApplicationController
  before_action :set_branch, only: %i[show edit update destroy]
  before_action :require_user, only: %i[create edit update destroy]
  
  def show
    render json: @branch
  end

  def create
    # branch = Branch.create(strong_params)
    # branch.update(story: Story.find(params[:story_id]))
    branch = Branch.new(strong_params)
    branch.user = current_user
    branch.save
    render json: branch
  end

  def edit
    render partial: 'form', locals: { branch: @branch, story: @story }
  end

  def update
    @branch.update(strong_params)
    redirect_to @branch.story
  end

  def destroy
    @branch.destroy
    redirect_to admin_path
  end

  private

  def strong_params
    params
      .require(:branch)
      .permit(:title, :body, :story_id, :parent_id, :end, :returnable)
  end

  def set_branch
    @story = Story.find(params[:story_id])
    @branch = Branch.find(params[:id])
  end
end
