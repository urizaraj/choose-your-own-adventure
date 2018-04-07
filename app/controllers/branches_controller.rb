class BranchesController < ApplicationController
  def show
    branch = Branch.find(params[:id])
    render json: branch
  end

  def create
    branch = Branch.create(strong_params)
    branch.update(story: Story.find(params[:story_id]))
    render json: branch
  end

  def strong_params
    params.require(:branch)
          .permit(:title, :body, :story_id, :parent_id, :end)
  end
end
