module ApplicationHelper
  def errors(resource)
    render partial: 'layouts/error', locals: { resource: resource }
  end

  def render_stars(i)
    render partial: 'reviews/stars', locals: { i: i.floor }
  end

  def admin?
    user_signed_in? ? current_user.admin : false
  end

  def delete_link(resource)
    link_to resource, method: 'delete', data: { confirm: 'Are you sure?' } do
      tag.i class: 'fas fa-trash'
    end
  end

  def fa(name, extra = '', prefix = 'fas')
    tag.i class: "#{prefix} fa-#{name} #{extra}"
  end

  def far(name, extra = '')
    fa name, extra, 'far'
  end

  def date(resource)
    resource.created_at.strftime '%B %-d, %Y'
  end

  def logo
    tag.i class: 'fas fa-share-alt fa-sm',
          data: {
            # 'fa-transform' => 'rotate-270 shrink-5 down-.5',
            'fa-transform' => 'rotate-270',
            # 'fa-mask' => 'fas fa-circle'
          }
  end

  def hb(type, key, &block)
    "{{##{type} #{key}}}
    #{capture(&block)}
    {{/#{type}}}"
  end
end
