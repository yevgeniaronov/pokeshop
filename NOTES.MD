
* file structure isnt good for real world app, some components are part of layout, some are presentation components.
  -- app 
    -- views
        -- cart/home
    -- layouts
        -- default (header)
    -- presentation
        -- list-item

* always prefer using alias (barel) imports, here it's overkill.
* router should use lazy loading to load components.
* app should be split into modules where each module only uses what it needs, here i'm putting everything into app.module.