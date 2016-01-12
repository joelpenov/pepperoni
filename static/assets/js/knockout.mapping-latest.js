



<!DOCTYPE html>
<html lang="en" class=" is-copy-enabled is-u2f-enabled">
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# object: http://ogp.me/ns/object# article: http://ogp.me/ns/article# profile: http://ogp.me/ns/profile#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Language" content="en">
    <meta name="viewport" content="width=1020">
    
    
    <title>knockout.mapping/knockout.mapping-latest.js at master · SteveSanderson/knockout.mapping · GitHub</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub">
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub">
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png">
    <meta property="fb:app_id" content="1401488693436528">

      <meta content="@github" name="twitter:site" /><meta content="summary" name="twitter:card" /><meta content="SteveSanderson/knockout.mapping" name="twitter:title" /><meta content="knockout.mapping - Object mapping plugin for KnockoutJS" name="twitter:description" /><meta content="https://avatars0.githubusercontent.com/u/161375?v=3&amp;s=400" name="twitter:image:src" />
      <meta content="GitHub" property="og:site_name" /><meta content="object" property="og:type" /><meta content="https://avatars0.githubusercontent.com/u/161375?v=3&amp;s=400" property="og:image" /><meta content="SteveSanderson/knockout.mapping" property="og:title" /><meta content="https://github.com/SteveSanderson/knockout.mapping" property="og:url" /><meta content="knockout.mapping - Object mapping plugin for KnockoutJS" property="og:description" />
      <meta name="browser-stats-url" content="https://api.github.com/_private/browser/stats">
    <meta name="browser-errors-url" content="https://api.github.com/_private/browser/errors">
    <link rel="assets" href="https://assets-cdn.github.com/">
    
    <meta name="pjax-timeout" content="1000">
    

    <meta name="msapplication-TileImage" content="/windows-tile.png">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="selected-link" value="repo_source" data-pjax-transient>

    <meta name="google-site-verification" content="KT5gs8h0wvaagLKAVWq8bbeNwnZZK1r1XQysX3xurLU">
    <meta name="google-analytics" content="UA-3769691-2">

<meta content="collector.githubapp.com" name="octolytics-host" /><meta content="github" name="octolytics-app-id" /><meta content="B32BE8B4:23F9:6367244:56945365" name="octolytics-dimension-request_id" />
<meta content="/&lt;user-name&gt;/&lt;repo-name&gt;/blob/show" data-pjax-transient="true" name="analytics-location" />
<meta content="Rails, view, blob#show" data-pjax-transient="true" name="analytics-event" />


  <meta class="js-ga-set" name="dimension1" content="Logged Out">



        <meta name="hostname" content="github.com">
    <meta name="user-login" content="">

        <meta name="expected-hostname" content="github.com">

      <link rel="mask-icon" href="https://assets-cdn.github.com/pinned-octocat.svg" color="#4078c0">
      <link rel="icon" type="image/x-icon" href="https://assets-cdn.github.com/favicon.ico">

    <meta content="4887deef233e1ee7afc6773ac8f16e771d6a8d55" name="form-nonce" />

    <link crossorigin="anonymous" href="https://assets-cdn.github.com/assets/github-2cd8e7b7c650541e94a142c9c10fb231b81455e1777c62510eb9b3402cc220b3.css" integrity="sha256-LNjnt8ZQVB6UoULJwQ+yMbgUVeF3fGJRDrmzQCzCILM=" media="all" rel="stylesheet" />
    <link crossorigin="anonymous" href="https://assets-cdn.github.com/assets/github2-f6cac5f5f824974f53cdab60af6078796cfc0fd4b5df66f8b82e028dd6c3fca0.css" integrity="sha256-9srF9fgkl09Tzatgr2B4eWz8D9S132b4uC4CjdbD/KA=" media="all" rel="stylesheet" />
    
    


    <meta http-equiv="x-pjax-version" content="368014c7b01a4112605b9965c32318c5">

      
  <meta name="description" content="knockout.mapping - Object mapping plugin for KnockoutJS">
  <meta name="go-import" content="github.com/SteveSanderson/knockout.mapping git https://github.com/SteveSanderson/knockout.mapping.git">

  <meta content="161375" name="octolytics-dimension-user_id" /><meta content="SteveSanderson" name="octolytics-dimension-user_login" /><meta content="1041356" name="octolytics-dimension-repository_id" /><meta content="SteveSanderson/knockout.mapping" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="1041356" name="octolytics-dimension-repository_network_root_id" /><meta content="SteveSanderson/knockout.mapping" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/SteveSanderson/knockout.mapping/commits/master.atom" rel="alternate" title="Recent Commits to knockout.mapping:master" type="application/atom+xml">

  </head>


  <body class="logged_out   env-production windows vis-public page-blob">
    <a href="#start-of-content" tabindex="1" class="accessibility-aid js-skip-to-content">Skip to content</a>

    
    
    



      
      <div class="header header-logged-out" role="banner">
  <div class="container clearfix">

    <a class="header-logo-wordmark" href="https://github.com/" data-ga-click="(Logged out) Header, go to homepage, icon:logo-wordmark">
      <span aria-hidden="true" class="mega-octicon octicon-logo-github"></span>
    </a>

    <div class="header-actions" role="navigation">
        <a class="btn btn-primary" href="/join" data-ga-click="(Logged out) Header, clicked Sign up, text:sign-up">Sign up</a>
      <a class="btn" href="/login?return_to=%2FSteveSanderson%2Fknockout.mapping%2Fblob%2Fmaster%2Fbuild%2Foutput%2Fknockout.mapping-latest.js" data-ga-click="(Logged out) Header, clicked Sign in, text:sign-in">Sign in</a>
    </div>

    <div class="site-search repo-scope js-site-search" role="search">
      <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/SteveSanderson/knockout.mapping/search" class="js-site-search-form" data-global-search-url="/search" data-repo-search-url="/SteveSanderson/knockout.mapping/search" method="get"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div>
  <label class="js-chromeless-input-container form-control">
    <div class="scope-badge">This repository</div>
    <input type="text"
      class="js-site-search-focus js-site-search-field is-clearable chromeless-input"
      data-hotkey="s"
      name="q"
      placeholder="Search"
      aria-label="Search this repository"
      data-global-scope-placeholder="Search GitHub"
      data-repo-scope-placeholder="Search"
      tabindex="1"
      autocapitalize="off">
  </label>
</form>
    </div>

      <ul class="header-nav left" role="navigation">
          <li class="header-nav-item">
            <a class="header-nav-link" href="/explore" data-ga-click="(Logged out) Header, go to explore, text:explore">Explore</a>
          </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="/features" data-ga-click="(Logged out) Header, go to features, text:features">Features</a>
          </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="https://enterprise.github.com/" data-ga-click="(Logged out) Header, go to enterprise, text:enterprise">Enterprise</a>
          </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="/pricing" data-ga-click="(Logged out) Header, go to pricing, text:pricing">Pricing</a>
          </li>
      </ul>

  </div>
</div>



    <div id="start-of-content" class="accessibility-aid"></div>

      <div id="js-flash-container">
</div>


    <div role="main" class="main-content">
        <div itemscope itemtype="http://schema.org/WebPage">
    <div id="js-repo-pjax-container" class="context-loader-container js-repo-nav-next" data-pjax-container>
      
<div class="pagehead repohead instapaper_ignore readability-menu experiment-repo-nav">
  <div class="container repohead-details-container">

    

<ul class="pagehead-actions">

  <li>
      <a href="/login?return_to=%2FSteveSanderson%2Fknockout.mapping"
    class="btn btn-sm btn-with-count tooltipped tooltipped-n"
    aria-label="You must be signed in to watch a repository" rel="nofollow">
    <span aria-hidden="true" class="octicon octicon-eye"></span>
    Watch
  </a>
  <a class="social-count" href="/SteveSanderson/knockout.mapping/watchers">
    63
  </a>

  </li>

  <li>
      <a href="/login?return_to=%2FSteveSanderson%2Fknockout.mapping"
    class="btn btn-sm btn-with-count tooltipped tooltipped-n"
    aria-label="You must be signed in to star a repository" rel="nofollow">
    <span aria-hidden="true" class="octicon octicon-star"></span>
    Star
  </a>

    <a class="social-count js-social-count" href="/SteveSanderson/knockout.mapping/stargazers">
      501
    </a>

  </li>

  <li>
      <a href="/login?return_to=%2FSteveSanderson%2Fknockout.mapping"
        class="btn btn-sm btn-with-count tooltipped tooltipped-n"
        aria-label="You must be signed in to fork a repository" rel="nofollow">
        <span aria-hidden="true" class="octicon octicon-repo-forked"></span>
        Fork
      </a>

    <a href="/SteveSanderson/knockout.mapping/network" class="social-count">
      683
    </a>
  </li>
</ul>

    <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public ">
  <span aria-hidden="true" class="octicon octicon-repo"></span>
  <span class="author"><a href="/SteveSanderson" class="url fn" itemprop="url" rel="author"><span itemprop="title">SteveSanderson</span></a></span><!--
--><span class="path-divider">/</span><!--
--><strong><a href="/SteveSanderson/knockout.mapping" data-pjax="#js-repo-pjax-container">knockout.mapping</a></strong>

  <span class="page-context-loader">
    <img alt="" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
  </span>

</h1>

  </div>
  <div class="container">
    
<nav class="reponav js-repo-nav js-sidenav-container-pjax js-octicon-loaders"
     role="navigation"
     data-pjax="#js-repo-pjax-container">

  <a href="/SteveSanderson/knockout.mapping" aria-label="Code" aria-selected="true" class="js-selected-navigation-item selected reponav-item" data-hotkey="g c" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches /SteveSanderson/knockout.mapping">
    <span aria-hidden="true" class="octicon octicon-code"></span>
    Code
</a>
    <a href="/SteveSanderson/knockout.mapping/issues" class="js-selected-navigation-item reponav-item" data-hotkey="g i" data-selected-links="repo_issues repo_labels repo_milestones /SteveSanderson/knockout.mapping/issues">
      <span aria-hidden="true" class="octicon octicon-issue-opened"></span>
      Issues
      <span class="counter">60</span>
</a>
  <a href="/SteveSanderson/knockout.mapping/pulls" class="js-selected-navigation-item reponav-item" data-hotkey="g p" data-selected-links="repo_pulls /SteveSanderson/knockout.mapping/pulls">
    <span aria-hidden="true" class="octicon octicon-git-pull-request"></span>
    Pull requests
    <span class="counter">18</span>
</a>

  <a href="/SteveSanderson/knockout.mapping/pulse" class="js-selected-navigation-item reponav-item" data-selected-links="pulse /SteveSanderson/knockout.mapping/pulse">
    <span aria-hidden="true" class="octicon octicon-pulse"></span>
    Pulse
</a>
  <a href="/SteveSanderson/knockout.mapping/graphs" class="js-selected-navigation-item reponav-item" data-selected-links="repo_graphs repo_contributors /SteveSanderson/knockout.mapping/graphs">
    <span aria-hidden="true" class="octicon octicon-graph"></span>
    Graphs
</a>

</nav>

  </div>
</div>

<div class="container new-discussion-timeline experiment-repo-nav">
  <div class="repository-content">

    

<a href="/SteveSanderson/knockout.mapping/blob/92f2649c61bdad2da3406811518f80387a1f6b57/build/output/knockout.mapping-latest.js" class="hidden js-permalink-shortcut" data-hotkey="y">Permalink</a>

<!-- blob contrib key: blob_contributors:v21:0e004891be24797a5f67512419cdac3a -->

<div class="file-navigation js-zeroclipboard-container">
  
<div class="select-menu js-menu-container js-select-menu left">
  <button class="btn btn-sm select-menu-button js-menu-target css-truncate" data-hotkey="w"
    title="master"
    type="button" aria-label="Switch branches or tags" tabindex="0" aria-haspopup="true">
    <i>Branch:</i>
    <span class="js-select-button css-truncate-target">master</span>
  </button>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax aria-hidden="true">

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <span aria-label="Close" class="octicon octicon-x js-menu-close" role="button"></span>
        <span class="select-menu-title">Switch branches/tags</span>
      </div>

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" aria-label="Filter branches/tags" id="context-commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" data-filter-placeholder="Filter branches/tags" class="js-select-menu-tab" role="tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" data-filter-placeholder="Find a tag…" class="js-select-menu-tab" role="tab">Tags</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches" role="menu">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <a class="select-menu-item js-navigation-item js-navigation-open "
               href="/SteveSanderson/knockout.mapping/blob/arrayperf/build/output/knockout.mapping-latest.js"
               data-name="arrayperf"
               data-skip-pjax="true"
               rel="nofollow">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <span class="select-menu-item-text css-truncate-target" title="arrayperf">
                arrayperf
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open selected"
               href="/SteveSanderson/knockout.mapping/blob/master/build/output/knockout.mapping-latest.js"
               data-name="master"
               data-skip-pjax="true"
               rel="nofollow">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <span class="select-menu-item-text css-truncate-target" title="master">
                master
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
               href="/SteveSanderson/knockout.mapping/blob/revert/build/output/knockout.mapping-latest.js"
               data-name="revert"
               data-skip-pjax="true"
               rel="nofollow">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <span class="select-menu-item-text css-truncate-target" title="revert">
                revert
              </span>
            </a>
        </div>

          <div class="select-menu-no-results">Nothing to show</div>
      </div>

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/SteveSanderson/knockout.mapping/tree/2.4.1/build/output/knockout.mapping-latest.js"
              data-name="2.4.1"
              data-skip-pjax="true"
              rel="nofollow">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <span class="select-menu-item-text css-truncate-target" title="2.4.1">
                2.4.1
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/SteveSanderson/knockout.mapping/tree/2.4.0/build/output/knockout.mapping-latest.js"
              data-name="2.4.0"
              data-skip-pjax="true"
              rel="nofollow">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <span class="select-menu-item-text css-truncate-target" title="2.4.0">
                2.4.0
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/SteveSanderson/knockout.mapping/tree/2.3.5/build/output/knockout.mapping-latest.js"
              data-name="2.3.5"
              data-skip-pjax="true"
              rel="nofollow">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <span class="select-menu-item-text css-truncate-target" title="2.3.5">
                2.3.5
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/SteveSanderson/knockout.mapping/tree/2.0.1/build/output/knockout.mapping-latest.js"
              data-name="2.0.1"
              data-skip-pjax="true"
              rel="nofollow">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <span class="select-menu-item-text css-truncate-target" title="2.0.1">
                2.0.1
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/SteveSanderson/knockout.mapping/tree/2.0/build/output/knockout.mapping-latest.js"
              data-name="2.0"
              data-skip-pjax="true"
              rel="nofollow">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <span class="select-menu-item-text css-truncate-target" title="2.0">
                2.0
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/SteveSanderson/knockout.mapping/tree/1.2.5/build/output/knockout.mapping-latest.js"
              data-name="1.2.5"
              data-skip-pjax="true"
              rel="nofollow">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <span class="select-menu-item-text css-truncate-target" title="1.2.5">
                1.2.5
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/SteveSanderson/knockout.mapping/tree/1.2.4/build/output/knockout.mapping-latest.js"
              data-name="1.2.4"
              data-skip-pjax="true"
              rel="nofollow">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <span class="select-menu-item-text css-truncate-target" title="1.2.4">
                1.2.4
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/SteveSanderson/knockout.mapping/tree/1.2.3/build/output/knockout.mapping-latest.js"
              data-name="1.2.3"
              data-skip-pjax="true"
              rel="nofollow">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <span class="select-menu-item-text css-truncate-target" title="1.2.3">
                1.2.3
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/SteveSanderson/knockout.mapping/tree/1.2.2/build/output/knockout.mapping-latest.js"
              data-name="1.2.2"
              data-skip-pjax="true"
              rel="nofollow">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <span class="select-menu-item-text css-truncate-target" title="1.2.2">
                1.2.2
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/SteveSanderson/knockout.mapping/tree/1.2.1/build/output/knockout.mapping-latest.js"
              data-name="1.2.1"
              data-skip-pjax="true"
              rel="nofollow">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <span class="select-menu-item-text css-truncate-target" title="1.2.1">
                1.2.1
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/SteveSanderson/knockout.mapping/tree/1.2/build/output/knockout.mapping-latest.js"
              data-name="1.2"
              data-skip-pjax="true"
              rel="nofollow">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <span class="select-menu-item-text css-truncate-target" title="1.2">
                1.2
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/SteveSanderson/knockout.mapping/tree/1.0/build/output/knockout.mapping-latest.js"
              data-name="1.0"
              data-skip-pjax="true"
              rel="nofollow">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <span class="select-menu-item-text css-truncate-target" title="1.0">
                1.0
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/SteveSanderson/knockout.mapping/tree/0.5/build/output/knockout.mapping-latest.js"
              data-name="0.5"
              data-skip-pjax="true"
              rel="nofollow">
              <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
              <span class="select-menu-item-text css-truncate-target" title="0.5">
                0.5
              </span>
            </a>
        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div>

    </div>
  </div>
</div>

  <div class="btn-group right">
    <a href="/SteveSanderson/knockout.mapping/find/master"
          class="js-show-file-finder btn btn-sm"
          data-pjax
          data-hotkey="t">
      Find file
    </a>
    <button aria-label="Copy file path to clipboard" class="js-zeroclipboard btn btn-sm zeroclipboard-button tooltipped tooltipped-s" data-copied-hint="Copied!" type="button">Copy path</button>
  </div>
  <div class="breadcrumb js-zeroclipboard-target">
    <span class="repo-root js-repo-root"><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/SteveSanderson/knockout.mapping" class="" data-branch="master" data-pjax="true" itemscope="url"><span itemprop="title">knockout.mapping</span></a></span></span><span class="separator">/</span><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/SteveSanderson/knockout.mapping/tree/master/build" class="" data-branch="master" data-pjax="true" itemscope="url"><span itemprop="title">build</span></a></span><span class="separator">/</span><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/SteveSanderson/knockout.mapping/tree/master/build/output" class="" data-branch="master" data-pjax="true" itemscope="url"><span itemprop="title">output</span></a></span><span class="separator">/</span><strong class="final-path">knockout.mapping-latest.js</strong>
  </div>
</div>


  <div class="commit-tease">
      <span class="right">
        <a class="commit-tease-sha" href="/SteveSanderson/knockout.mapping/commit/35482d03ee7520b1afe0b437a6e66150369378a7" data-pjax>
          35482d0
        </a>
        <time datetime="2013-02-08T14:18:25Z" is="relative-time">Feb 8, 2013</time>
      </span>
      <div>
        <img alt="@RoyJacobs" class="avatar" height="20" src="https://avatars0.githubusercontent.com/u/173822?v=3&amp;s=40" width="20" />
        <a href="/RoyJacobs" class="user-mention" rel="contributor">RoyJacobs</a>
          <a href="/SteveSanderson/knockout.mapping/commit/35482d03ee7520b1afe0b437a6e66150369378a7" class="message" data-pjax="true" title="Bumped version to 2.4.1 and rebuilt">Bumped version to 2.4.1 and rebuilt</a>
      </div>

    <div class="commit-tease-contributors">
      <a class="muted-link contributors-toggle" href="#blob_contributors_box" rel="facebox">
        <strong>3</strong>
         contributors
      </a>
          <a class="avatar-link tooltipped tooltipped-s" aria-label="RoyJacobs" href="/SteveSanderson/knockout.mapping/commits/master/build/output/knockout.mapping-latest.js?author=RoyJacobs"><img alt="@RoyJacobs" class="avatar" height="20" src="https://avatars0.githubusercontent.com/u/173822?v=3&amp;s=40" width="20" /> </a>
    <a class="avatar-link tooltipped tooltipped-s" aria-label="SteveSanderson" href="/SteveSanderson/knockout.mapping/commits/master/build/output/knockout.mapping-latest.js?author=SteveSanderson"><img alt="@SteveSanderson" class="avatar" height="20" src="https://avatars0.githubusercontent.com/u/161375?v=3&amp;s=40" width="20" /> </a>
    <a class="avatar-link tooltipped tooltipped-s" aria-label="jpc" href="/SteveSanderson/knockout.mapping/commits/master/build/output/knockout.mapping-latest.js?author=jpc"><img alt="@jpc" class="avatar" height="20" src="https://avatars2.githubusercontent.com/u/107984?v=3&amp;s=40" width="20" /> </a>


    </div>

    <div id="blob_contributors_box" style="display:none">
      <h2 class="facebox-header" data-facebox-id="facebox-header">Users who have contributed to this file</h2>
      <ul class="facebox-user-list" data-facebox-id="facebox-description">
          <li class="facebox-user-list-item">
            <img alt="@RoyJacobs" height="24" src="https://avatars2.githubusercontent.com/u/173822?v=3&amp;s=48" width="24" />
            <a href="/RoyJacobs">RoyJacobs</a>
          </li>
          <li class="facebox-user-list-item">
            <img alt="@SteveSanderson" height="24" src="https://avatars2.githubusercontent.com/u/161375?v=3&amp;s=48" width="24" />
            <a href="/SteveSanderson">SteveSanderson</a>
          </li>
          <li class="facebox-user-list-item">
            <img alt="@jpc" height="24" src="https://avatars0.githubusercontent.com/u/107984?v=3&amp;s=48" width="24" />
            <a href="/jpc">jpc</a>
          </li>
      </ul>
    </div>
  </div>

<div class="file">
  <div class="file-header">
  <div class="file-actions">

    <div class="btn-group">
      <a href="/SteveSanderson/knockout.mapping/raw/master/build/output/knockout.mapping-latest.js" class="btn btn-sm " id="raw-url">Raw</a>
        <a href="/SteveSanderson/knockout.mapping/blame/master/build/output/knockout.mapping-latest.js" class="btn btn-sm js-update-url-with-hash">Blame</a>
      <a href="/SteveSanderson/knockout.mapping/commits/master/build/output/knockout.mapping-latest.js" class="btn btn-sm " rel="nofollow">History</a>
    </div>

        <a class="octicon-btn tooltipped tooltipped-nw"
           href="https://windows.github.com"
           aria-label="Open this file in GitHub Desktop"
           data-ga-click="Repository, open with desktop, type:windows">
            <span aria-hidden="true" class="octicon octicon-device-desktop"></span>
        </a>

        <button type="button" class="octicon-btn disabled tooltipped tooltipped-nw"
          aria-label="You must be signed in to make or propose changes">
          <span aria-hidden="true" class="octicon octicon-pencil"></span>
        </button>
        <button type="button" class="octicon-btn octicon-btn-danger disabled tooltipped tooltipped-nw"
          aria-label="You must be signed in to make or propose changes">
          <span aria-hidden="true" class="octicon octicon-trashcan"></span>
        </button>
  </div>

  <div class="file-info">
      23 lines (22 sloc)
      <span class="file-info-divider"></span>
    9.3 KB
  </div>
</div>

  

  <div class="blob-wrapper data type-javascript">
      <table class="highlight tab-size js-file-line-container" data-tab-size="8">
      <tr>
        <td id="L1" class="blob-num js-line-number" data-line-number="1"></td>
        <td id="LC1" class="blob-code blob-code-inner js-file-line"><span class="pl-c">/// Knockout Mapping plugin v2.4.1</span></td>
      </tr>
      <tr>
        <td id="L2" class="blob-num js-line-number" data-line-number="2"></td>
        <td id="LC2" class="blob-code blob-code-inner js-file-line"><span class="pl-c">/// (c) 2013 Steven Sanderson, Roy Jacobs - http://knockoutjs.com/</span></td>
      </tr>
      <tr>
        <td id="L3" class="blob-num js-line-number" data-line-number="3"></td>
        <td id="LC3" class="blob-code blob-code-inner js-file-line"><span class="pl-c">/// License: MIT (http://www.opensource.org/licenses/mit-license.php)</span></td>
      </tr>
      <tr>
        <td id="L4" class="blob-num js-line-number" data-line-number="4"></td>
        <td id="LC4" class="blob-code blob-code-inner js-file-line">(<span class="pl-k">function</span>(<span class="pl-smi">e</span>){<span class="pl-s"><span class="pl-pds">&quot;</span>function<span class="pl-pds">&quot;</span></span><span class="pl-k">===</span><span class="pl-k">typeof</span> <span class="pl-c1">require</span><span class="pl-k">&amp;&amp;</span><span class="pl-s"><span class="pl-pds">&quot;</span>object<span class="pl-pds">&quot;</span></span><span class="pl-k">===</span><span class="pl-k">typeof</span> <span class="pl-c1">exports</span><span class="pl-k">&amp;&amp;</span><span class="pl-s"><span class="pl-pds">&quot;</span>object<span class="pl-pds">&quot;</span></span><span class="pl-k">===</span><span class="pl-k">typeof</span> <span class="pl-c1">module</span><span class="pl-k">?</span><span class="pl-en">e</span>(<span class="pl-c1">require</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>knockout<span class="pl-pds">&quot;</span></span>),<span class="pl-c1">exports</span>)<span class="pl-k">:</span><span class="pl-s"><span class="pl-pds">&quot;</span>function<span class="pl-pds">&quot;</span></span><span class="pl-k">===</span><span class="pl-k">typeof</span> define<span class="pl-k">&amp;&amp;</span><span class="pl-smi">define</span>.<span class="pl-smi">amd</span><span class="pl-k">?</span><span class="pl-en">define</span>([<span class="pl-s"><span class="pl-pds">&quot;</span>knockout<span class="pl-pds">&quot;</span></span>,<span class="pl-s"><span class="pl-pds">&quot;</span>exports<span class="pl-pds">&quot;</span></span>],e)<span class="pl-k">:</span><span class="pl-en">e</span>(ko,<span class="pl-smi">ko</span>.<span class="pl-smi">mapping</span><span class="pl-k">=</span>{})})(<span class="pl-k">function</span>(<span class="pl-smi">e</span>,<span class="pl-smi">f</span>){<span class="pl-k">function</span> <span class="pl-en">y</span>(<span class="pl-smi">b</span>,<span class="pl-smi">c</span>){<span class="pl-k">var</span> a,d;<span class="pl-k">for</span>(d <span class="pl-k">in</span> c)<span class="pl-k">if</span>(<span class="pl-smi">c</span>.<span class="pl-en">hasOwnProperty</span>(d)<span class="pl-k">&amp;&amp;</span>c[d])<span class="pl-k">if</span>(a<span class="pl-k">=</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(b[d]),d<span class="pl-k">&amp;&amp;</span>b[d]<span class="pl-k">&amp;&amp;</span><span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span><span class="pl-k">!==</span>a<span class="pl-k">&amp;&amp;</span><span class="pl-s"><span class="pl-pds">&quot;</span>string<span class="pl-pds">&quot;</span></span><span class="pl-k">!==</span>a)<span class="pl-en">y</span>(b[d],c[d]);<span class="pl-k">else</span> <span class="pl-k">if</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span><span class="pl-k">===</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(b[d])<span class="pl-k">&amp;&amp;</span><span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span><span class="pl-k">===</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(c[d])){a<span class="pl-k">=</span>b;<span class="pl-k">for</span>(<span class="pl-k">var</span> e<span class="pl-k">=</span>d,l<span class="pl-k">=</span>b[d],n<span class="pl-k">=</span>c[d],t<span class="pl-k">=</span>{},g<span class="pl-k">=</span><span class="pl-smi">l</span>.<span class="pl-c1">length</span><span class="pl-k">-</span><span class="pl-c1">1</span>;<span class="pl-c1">0</span><span class="pl-k">&lt;=</span>g;<span class="pl-k">--</span>g)t[l[g]]<span class="pl-k">=</span>l[g];<span class="pl-k">for</span>(g<span class="pl-k">=</span></td>
      </tr>
      <tr>
        <td id="L5" class="blob-num js-line-number" data-line-number="5"></td>
        <td id="LC5" class="blob-code blob-code-inner js-file-line"><span class="pl-smi">n</span>.<span class="pl-c1">length</span><span class="pl-k">-</span><span class="pl-c1">1</span>;<span class="pl-c1">0</span><span class="pl-k">&lt;=</span>g;<span class="pl-k">--</span>g)t[n[g]]<span class="pl-k">=</span>n[g];l<span class="pl-k">=</span>[];n<span class="pl-k">=</span><span class="pl-k">void</span> <span class="pl-c1">0</span>;<span class="pl-k">for</span>(n <span class="pl-k">in</span> t)<span class="pl-smi">l</span>.<span class="pl-c1">push</span>(t[n]);a[e]<span class="pl-k">=</span>l}<span class="pl-k">else</span> b[d]<span class="pl-k">=</span>c[d]}<span class="pl-k">function</span> <span class="pl-en">E</span>(<span class="pl-smi">b</span>,<span class="pl-smi">c</span>){<span class="pl-k">var</span> a<span class="pl-k">=</span>{};<span class="pl-en">y</span>(a,b);<span class="pl-en">y</span>(a,c);<span class="pl-k">return</span> a}<span class="pl-k">function</span> <span class="pl-en">z</span>(<span class="pl-smi">b</span>,<span class="pl-smi">c</span>){<span class="pl-k">for</span>(<span class="pl-k">var</span> a<span class="pl-k">=</span><span class="pl-en">E</span>({},b),e<span class="pl-k">=</span><span class="pl-smi">L</span>.<span class="pl-c1">length</span><span class="pl-k">-</span><span class="pl-c1">1</span>;<span class="pl-c1">0</span><span class="pl-k">&lt;=</span>e;e<span class="pl-k">--</span>){<span class="pl-k">var</span> f<span class="pl-k">=</span>L[e];a[f]<span class="pl-k">&amp;&amp;</span>(a[<span class="pl-s"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>]<span class="pl-k">instanceof</span> <span class="pl-c1">Object</span><span class="pl-k">||</span>(a[<span class="pl-s"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>]<span class="pl-k">=</span>{}),a[<span class="pl-s"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>][f]<span class="pl-k">=</span>a[f],<span class="pl-k">delete</span> a[f])}c<span class="pl-k">&amp;&amp;</span>(<span class="pl-smi">a</span>.<span class="pl-smi">ignore</span><span class="pl-k">=</span><span class="pl-en">h</span>(<span class="pl-smi">c</span>.<span class="pl-smi">ignore</span>,<span class="pl-smi">a</span>.<span class="pl-smi">ignore</span>),<span class="pl-smi">a</span>.<span class="pl-smi">include</span><span class="pl-k">=</span><span class="pl-en">h</span>(<span class="pl-smi">c</span>.<span class="pl-smi">include</span>,<span class="pl-smi">a</span>.<span class="pl-smi">include</span>),<span class="pl-smi">a</span>.<span class="pl-smi">copy</span><span class="pl-k">=</span><span class="pl-en">h</span>(<span class="pl-smi">c</span>.<span class="pl-smi">copy</span>,<span class="pl-smi">a</span>.<span class="pl-smi">copy</span>),<span class="pl-smi">a</span>.<span class="pl-smi">observe</span><span class="pl-k">=</span><span class="pl-en">h</span>(<span class="pl-smi">c</span>.<span class="pl-smi">observe</span>,<span class="pl-smi">a</span>.<span class="pl-smi">observe</span>));<span class="pl-smi">a</span>.<span class="pl-smi">ignore</span><span class="pl-k">=</span><span class="pl-en">h</span>(<span class="pl-smi">a</span>.<span class="pl-smi">ignore</span>,<span class="pl-smi">j</span>.<span class="pl-smi">ignore</span>);<span class="pl-smi">a</span>.<span class="pl-smi">include</span><span class="pl-k">=</span><span class="pl-en">h</span>(<span class="pl-smi">a</span>.<span class="pl-smi">include</span>,<span class="pl-smi">j</span>.<span class="pl-smi">include</span>);<span class="pl-smi">a</span>.<span class="pl-smi">copy</span><span class="pl-k">=</span><span class="pl-en">h</span>(<span class="pl-smi">a</span>.<span class="pl-smi">copy</span>,<span class="pl-smi">j</span>.<span class="pl-smi">copy</span>);<span class="pl-smi">a</span>.<span class="pl-smi">observe</span><span class="pl-k">=</span><span class="pl-en">h</span>(<span class="pl-smi">a</span>.<span class="pl-smi">observe</span>,</td>
      </tr>
      <tr>
        <td id="L6" class="blob-num js-line-number" data-line-number="6"></td>
        <td id="LC6" class="blob-code blob-code-inner js-file-line"><span class="pl-smi">j</span>.<span class="pl-smi">observe</span>);<span class="pl-smi">a</span>.<span class="pl-smi">mappedProperties</span><span class="pl-k">=</span><span class="pl-smi">a</span>.<span class="pl-smi">mappedProperties</span><span class="pl-k">||</span>{};<span class="pl-smi">a</span>.<span class="pl-smi">copiedProperties</span><span class="pl-k">=</span><span class="pl-smi">a</span>.<span class="pl-smi">copiedProperties</span><span class="pl-k">||</span>{};<span class="pl-k">return</span> a}<span class="pl-k">function</span> <span class="pl-en">h</span>(<span class="pl-smi">b</span>,<span class="pl-smi">c</span>){<span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span><span class="pl-k">!==</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(b)<span class="pl-k">&amp;&amp;</span>(b<span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">&quot;</span>undefined<span class="pl-pds">&quot;</span></span><span class="pl-k">===</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(b)<span class="pl-k">?</span>[]<span class="pl-k">:</span>[b]);<span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span><span class="pl-k">!==</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(c)<span class="pl-k">&amp;&amp;</span>(c<span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">&quot;</span>undefined<span class="pl-pds">&quot;</span></span><span class="pl-k">===</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(c)<span class="pl-k">?</span>[]<span class="pl-k">:</span>[c]);<span class="pl-k">return</span> <span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">arrayGetDistinctValues</span>(<span class="pl-smi">b</span>.<span class="pl-c1">concat</span>(c))}<span class="pl-k">function</span> <span class="pl-en">F</span>(<span class="pl-smi">b</span>,<span class="pl-smi">c</span>,<span class="pl-smi">a</span>,<span class="pl-smi">d</span>,<span class="pl-smi">k</span>,<span class="pl-smi">l</span>,<span class="pl-smi">n</span>){<span class="pl-k">var</span> t<span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span><span class="pl-k">===</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(<span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(c));l<span class="pl-k">=</span>l<span class="pl-k">||</span><span class="pl-s"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>;<span class="pl-k">if</span>(<span class="pl-smi">f</span>.<span class="pl-en">isMapped</span>(b)){<span class="pl-k">var</span> g<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(b)[p];a<span class="pl-k">=</span><span class="pl-en">E</span>(g,a)}<span class="pl-k">var</span> j<span class="pl-k">=</span>n<span class="pl-k">||</span>k,<span class="pl-en">h</span><span class="pl-k">=</span><span class="pl-k">function</span>(){<span class="pl-k">return</span> a[d]<span class="pl-k">&amp;&amp;</span>a[d].<span class="pl-smi">create</span> <span class="pl-k">instanceof</span></td>
      </tr>
      <tr>
        <td id="L7" class="blob-num js-line-number" data-line-number="7"></td>
        <td id="LC7" class="blob-code blob-code-inner js-file-line"><span class="pl-c1">Function</span>},<span class="pl-en">x</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">b</span>){<span class="pl-k">var</span> f<span class="pl-k">=</span>G,g<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">dependentObservable</span>;<span class="pl-c1">e</span>.<span class="pl-en">dependentObservable</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">a</span>,<span class="pl-smi">b</span>,<span class="pl-smi">c</span>){c<span class="pl-k">=</span>c<span class="pl-k">||</span>{};a<span class="pl-k">&amp;&amp;</span><span class="pl-s"><span class="pl-pds">&quot;</span>object<span class="pl-pds">&quot;</span></span><span class="pl-k">==</span><span class="pl-k">typeof</span> a<span class="pl-k">&amp;&amp;</span>(c<span class="pl-k">=</span>a);<span class="pl-k">var</span> d<span class="pl-k">=</span><span class="pl-smi">c</span>.<span class="pl-smi">deferEvaluation</span>,M<span class="pl-k">=</span><span class="pl-k">!</span><span class="pl-c1">1</span>;<span class="pl-smi">c</span>.<span class="pl-smi">deferEvaluation</span><span class="pl-k">=</span><span class="pl-k">!</span><span class="pl-c1">0</span>;a<span class="pl-k">=</span><span class="pl-k">new</span> <span class="pl-en">H</span>(a,b,c);<span class="pl-k">if</span>(<span class="pl-k">!</span>d){<span class="pl-k">var</span> g<span class="pl-k">=</span>a,d<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">dependentObservable</span>;<span class="pl-smi">e</span>.<span class="pl-smi">dependentObservable</span><span class="pl-k">=</span>H;a<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-en">isWriteableObservable</span>(g);<span class="pl-smi">e</span>.<span class="pl-smi">dependentObservable</span><span class="pl-k">=</span>d;d<span class="pl-k">=</span><span class="pl-en">H</span>({<span class="pl-en">read</span><span class="pl-k">:</span><span class="pl-k">function</span>(){M<span class="pl-k">||</span>(<span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">arrayRemoveItem</span>(f,g),M<span class="pl-k">=</span><span class="pl-k">!</span><span class="pl-c1">0</span>);<span class="pl-k">return</span> <span class="pl-smi">g</span>.<span class="pl-c1">apply</span>(g,arguments)},write<span class="pl-k">:</span>a<span class="pl-k">&amp;&amp;</span><span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">return</span> <span class="pl-en">g</span>(a)},deferEvaluation<span class="pl-k">:</span><span class="pl-k">!</span><span class="pl-c1">0</span>});<span class="pl-smi">d</span>.<span class="pl-smi">__DO</span><span class="pl-k">=</span>g;a<span class="pl-k">=</span>d;<span class="pl-smi">f</span>.<span class="pl-c1">push</span>(a)}<span class="pl-k">return</span> a};<span class="pl-smi">e</span>.<span class="pl-smi">dependentObservable</span>.<span class="pl-smi">fn</span><span class="pl-k">=</span></td>
      </tr>
      <tr>
        <td id="L8" class="blob-num js-line-number" data-line-number="8"></td>
        <td id="LC8" class="blob-code blob-code-inner js-file-line"><span class="pl-smi">H</span>.<span class="pl-smi">fn</span>;<span class="pl-smi">e</span>.<span class="pl-smi">computed</span><span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">dependentObservable</span>;b<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(k)<span class="pl-k">instanceof</span> <span class="pl-c1">Array</span><span class="pl-k">?</span>a[d].<span class="pl-en">create</span>({data<span class="pl-k">:</span>b<span class="pl-k">||</span>c,parent<span class="pl-k">:</span>j,skip<span class="pl-k">:</span>N})<span class="pl-k">:</span>a[d].<span class="pl-en">create</span>({data<span class="pl-k">:</span>b<span class="pl-k">||</span>c,parent<span class="pl-k">:</span>j});<span class="pl-smi">e</span>.<span class="pl-smi">dependentObservable</span><span class="pl-k">=</span>g;<span class="pl-smi">e</span>.<span class="pl-smi">computed</span><span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">dependentObservable</span>;<span class="pl-k">return</span> b},<span class="pl-en">u</span><span class="pl-k">=</span><span class="pl-k">function</span>(){<span class="pl-k">return</span> a[d]<span class="pl-k">&amp;&amp;</span>a[d].<span class="pl-smi">update</span> <span class="pl-k">instanceof</span> <span class="pl-c1">Function</span>},<span class="pl-en">v</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">b</span>,<span class="pl-smi">f</span>){<span class="pl-k">var</span> g<span class="pl-k">=</span>{data<span class="pl-k">:</span>f<span class="pl-k">||</span>c,parent<span class="pl-k">:</span>j,target<span class="pl-k">:</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(b)};<span class="pl-smi">e</span>.<span class="pl-en">isWriteableObservable</span>(b)<span class="pl-k">&amp;&amp;</span>(<span class="pl-smi">g</span>.<span class="pl-smi">observable</span><span class="pl-k">=</span>b);<span class="pl-k">return</span> a[d].<span class="pl-en">update</span>(g)};<span class="pl-k">if</span>(n<span class="pl-k">=</span><span class="pl-smi">I</span>.<span class="pl-en">get</span>(c))<span class="pl-k">return</span> n;d<span class="pl-k">=</span>d<span class="pl-k">||</span><span class="pl-s"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>;<span class="pl-k">if</span>(t){<span class="pl-k">var</span> t<span class="pl-k">=</span>[],s<span class="pl-k">=</span><span class="pl-k">!</span><span class="pl-c1">1</span>,<span class="pl-en">m</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">return</span> a};</td>
      </tr>
      <tr>
        <td id="L9" class="blob-num js-line-number" data-line-number="9"></td>
        <td id="LC9" class="blob-code blob-code-inner js-file-line">a[d]<span class="pl-k">&amp;&amp;</span>a[d].<span class="pl-smi">key</span><span class="pl-k">&amp;&amp;</span>(m<span class="pl-k">=</span>a[d].<span class="pl-smi">key</span>,s<span class="pl-k">=</span><span class="pl-k">!</span><span class="pl-c1">0</span>);<span class="pl-smi">e</span>.<span class="pl-en">isObservable</span>(b)<span class="pl-k">||</span>(b<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-en">observableArray</span>([]),<span class="pl-c1">b</span>.<span class="pl-en">mappedRemove</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">var</span> c<span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">&quot;</span>function<span class="pl-pds">&quot;</span></span><span class="pl-k">==</span><span class="pl-k">typeof</span> <span class="pl-en">a?a</span><span class="pl-k">:</span><span class="pl-k">function</span>(<span class="pl-smi">b</span>){<span class="pl-k">return</span> b<span class="pl-k">===</span><span class="pl-en">m</span>(a)};<span class="pl-k">return</span> <span class="pl-smi">b</span>.<span class="pl-en">remove</span>(<span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">return</span> <span class="pl-en">c</span>(<span class="pl-en">m</span>(a))})},<span class="pl-c1">b</span>.<span class="pl-en">mappedRemoveAll</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">var</span> c<span class="pl-k">=</span><span class="pl-en">C</span>(a,m);<span class="pl-k">return</span> <span class="pl-smi">b</span>.<span class="pl-en">remove</span>(<span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">return</span><span class="pl-k">-</span><span class="pl-c1">1</span><span class="pl-k">!=</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">arrayIndexOf</span>(c,<span class="pl-en">m</span>(a))})},<span class="pl-c1">b</span>.<span class="pl-en">mappedDestroy</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">var</span> c<span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">&quot;</span>function<span class="pl-pds">&quot;</span></span><span class="pl-k">==</span><span class="pl-k">typeof</span> <span class="pl-en">a?a</span><span class="pl-k">:</span><span class="pl-k">function</span>(<span class="pl-smi">b</span>){<span class="pl-k">return</span> b<span class="pl-k">===</span><span class="pl-en">m</span>(a)};<span class="pl-k">return</span> <span class="pl-smi">b</span>.<span class="pl-en">destroy</span>(<span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">return</span> <span class="pl-en">c</span>(<span class="pl-en">m</span>(a))})},<span class="pl-c1">b</span>.<span class="pl-en">mappedDestroyAll</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">var</span> c<span class="pl-k">=</span><span class="pl-en">C</span>(a,m);<span class="pl-k">return</span> <span class="pl-smi">b</span>.<span class="pl-en">destroy</span>(<span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">return</span><span class="pl-k">-</span><span class="pl-c1">1</span><span class="pl-k">!=</span></td>
      </tr>
      <tr>
        <td id="L10" class="blob-num js-line-number" data-line-number="10"></td>
        <td id="LC10" class="blob-code blob-code-inner js-file-line"><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">arrayIndexOf</span>(c,<span class="pl-en">m</span>(a))})},<span class="pl-c1">b</span>.<span class="pl-en">mappedIndexOf</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">var</span> c<span class="pl-k">=</span><span class="pl-en">C</span>(<span class="pl-en">b</span>(),m);a<span class="pl-k">=</span><span class="pl-en">m</span>(a);<span class="pl-k">return</span> <span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">arrayIndexOf</span>(c,a)},<span class="pl-c1">b</span>.<span class="pl-en">mappedGet</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">return</span> <span class="pl-en">b</span>()[<span class="pl-smi">b</span>.<span class="pl-en">mappedIndexOf</span>(a)]},<span class="pl-c1">b</span>.<span class="pl-en">mappedCreate</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">if</span>(<span class="pl-k">-</span><span class="pl-c1">1</span><span class="pl-k">!==</span><span class="pl-smi">b</span>.<span class="pl-en">mappedIndexOf</span>(a))<span class="pl-k">throw</span> <span class="pl-en">Error</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>There already is an object with the key that you specified.<span class="pl-pds">&quot;</span></span>);<span class="pl-k">var</span> c<span class="pl-k">=</span><span class="pl-en">h</span>()<span class="pl-k">?</span><span class="pl-en">x</span>(a)<span class="pl-k">:</span>a;<span class="pl-en">u</span>()<span class="pl-k">&amp;&amp;</span>(a<span class="pl-k">=</span><span class="pl-en">v</span>(c,a),<span class="pl-smi">e</span>.<span class="pl-en">isWriteableObservable</span>(c)<span class="pl-k">?</span><span class="pl-en">c</span>(a)<span class="pl-k">:</span>c<span class="pl-k">=</span>a);<span class="pl-smi">b</span>.<span class="pl-c1">push</span>(c);<span class="pl-k">return</span> c});n<span class="pl-k">=</span><span class="pl-en">C</span>(<span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(b),m).<span class="pl-c1">sort</span>();g<span class="pl-k">=</span><span class="pl-en">C</span>(c,m);s<span class="pl-k">&amp;&amp;</span><span class="pl-smi">g</span>.<span class="pl-c1">sort</span>();s<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">compareArrays</span>(n,g);n<span class="pl-k">=</span>{};<span class="pl-k">var</span> J,A<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(c),</td>
      </tr>
      <tr>
        <td id="L11" class="blob-num js-line-number" data-line-number="11"></td>
        <td id="LC11" class="blob-code blob-code-inner js-file-line">y<span class="pl-k">=</span>{},z<span class="pl-k">=</span><span class="pl-k">!</span><span class="pl-c1">0</span>,g<span class="pl-k">=</span><span class="pl-c1">0</span>;<span class="pl-k">for</span>(J<span class="pl-k">=</span><span class="pl-smi">A</span>.<span class="pl-c1">length</span>;g<span class="pl-k">&lt;</span>J;g<span class="pl-k">++</span>){<span class="pl-k">var</span> r<span class="pl-k">=</span><span class="pl-en">m</span>(A[g]);<span class="pl-k">if</span>(<span class="pl-k">void</span> <span class="pl-c1">0</span><span class="pl-k">===</span>r<span class="pl-k">||</span>r <span class="pl-k">instanceof</span> <span class="pl-c1">Object</span>){z<span class="pl-k">=</span><span class="pl-k">!</span><span class="pl-c1">1</span>;<span class="pl-k">break</span>}y[r]<span class="pl-k">=</span>A[g]}<span class="pl-k">var</span> A<span class="pl-k">=</span>[],B<span class="pl-k">=</span><span class="pl-c1">0</span>,g<span class="pl-k">=</span><span class="pl-c1">0</span>;<span class="pl-k">for</span>(J<span class="pl-k">=</span><span class="pl-smi">s</span>.<span class="pl-c1">length</span>;g<span class="pl-k">&lt;</span>J;g<span class="pl-k">++</span>){<span class="pl-k">var</span> r<span class="pl-k">=</span>s[g],q,w<span class="pl-k">=</span>l<span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&quot;</span>[<span class="pl-pds">&quot;</span></span><span class="pl-k">+</span>g<span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&quot;</span>]<span class="pl-pds">&quot;</span></span>;<span class="pl-k">switch</span>(<span class="pl-smi">r</span>.<span class="pl-c1">status</span>){<span class="pl-k">case</span> <span class="pl-s"><span class="pl-pds">&quot;</span>added<span class="pl-pds">&quot;</span></span><span class="pl-k">:</span><span class="pl-k">var</span> D<span class="pl-k">=</span>z<span class="pl-k">?</span>y[<span class="pl-smi">r</span>.<span class="pl-c1">value</span>]<span class="pl-k">:</span><span class="pl-en">K</span>(<span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(c),<span class="pl-smi">r</span>.<span class="pl-c1">value</span>,m);q<span class="pl-k">=</span><span class="pl-en">F</span>(<span class="pl-k">void</span> <span class="pl-c1">0</span>,D,a,d,b,w,k);<span class="pl-en">h</span>()<span class="pl-k">||</span>(q<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(q));w<span class="pl-k">=</span><span class="pl-en">O</span>(<span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(c),D,n);q<span class="pl-k">===</span>N<span class="pl-k">?</span>B<span class="pl-k">++</span><span class="pl-k">:</span>A[w<span class="pl-k">-</span>B]<span class="pl-k">=</span>q;n[w]<span class="pl-k">=</span><span class="pl-k">!</span><span class="pl-c1">0</span>;<span class="pl-k">break</span>;<span class="pl-k">case</span> <span class="pl-s"><span class="pl-pds">&quot;</span>retained<span class="pl-pds">&quot;</span></span><span class="pl-k">:</span>D<span class="pl-k">=</span>z<span class="pl-k">?</span>y[<span class="pl-smi">r</span>.<span class="pl-c1">value</span>]<span class="pl-k">:</span><span class="pl-en">K</span>(<span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(c),<span class="pl-smi">r</span>.<span class="pl-c1">value</span>,m);q<span class="pl-k">=</span><span class="pl-en">K</span>(b,<span class="pl-smi">r</span>.<span class="pl-c1">value</span>,m);<span class="pl-en">F</span>(q,D,a,d,b,w,</td>
      </tr>
      <tr>
        <td id="L12" class="blob-num js-line-number" data-line-number="12"></td>
        <td id="LC12" class="blob-code blob-code-inner js-file-line">k);w<span class="pl-k">=</span><span class="pl-en">O</span>(<span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(c),D,n);A[w]<span class="pl-k">=</span>q;n[w]<span class="pl-k">=</span><span class="pl-k">!</span><span class="pl-c1">0</span>;<span class="pl-k">break</span>;<span class="pl-k">case</span> <span class="pl-s"><span class="pl-pds">&quot;</span>deleted<span class="pl-pds">&quot;</span></span><span class="pl-k">:</span>q<span class="pl-k">=</span><span class="pl-en">K</span>(b,<span class="pl-smi">r</span>.<span class="pl-c1">value</span>,m)}<span class="pl-smi">t</span>.<span class="pl-c1">push</span>({<span class="pl-c1">event</span><span class="pl-k">:</span><span class="pl-smi">r</span>.<span class="pl-c1">status</span>,item<span class="pl-k">:</span>q})}<span class="pl-en">b</span>(A);a[d]<span class="pl-k">&amp;&amp;</span>a[d].<span class="pl-smi">arrayChanged</span><span class="pl-k">&amp;&amp;</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">arrayForEach</span>(t,<span class="pl-k">function</span>(<span class="pl-smi">b</span>){a[d].<span class="pl-en">arrayChanged</span>(<span class="pl-smi">b</span>.<span class="pl-c1">event</span>,<span class="pl-smi">b</span>.<span class="pl-smi">item</span>)})}<span class="pl-k">else</span> <span class="pl-k">if</span>(<span class="pl-en">P</span>(c)){b<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(b);<span class="pl-k">if</span>(<span class="pl-k">!</span>b){<span class="pl-k">if</span>(<span class="pl-en">h</span>())<span class="pl-k">return</span> s<span class="pl-k">=</span><span class="pl-en">x</span>(),<span class="pl-en">u</span>()<span class="pl-k">&amp;&amp;</span>(s<span class="pl-k">=</span><span class="pl-en">v</span>(s)),s;<span class="pl-k">if</span>(<span class="pl-en">u</span>())<span class="pl-k">return</span> <span class="pl-en">v</span>(s);b<span class="pl-k">=</span>{}}<span class="pl-en">u</span>()<span class="pl-k">&amp;&amp;</span>(b<span class="pl-k">=</span><span class="pl-en">v</span>(b));<span class="pl-smi">I</span>.<span class="pl-en">save</span>(c,b);<span class="pl-k">if</span>(<span class="pl-en">u</span>())<span class="pl-k">return</span> b;<span class="pl-en">Q</span>(c,<span class="pl-k">function</span>(<span class="pl-smi">d</span>){<span class="pl-k">var</span> f<span class="pl-k">=</span><span class="pl-smi">l</span>.<span class="pl-c1">length</span><span class="pl-k">?</span>l<span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&quot;</span>.<span class="pl-pds">&quot;</span></span><span class="pl-k">+</span>d<span class="pl-k">:</span>d;<span class="pl-k">if</span>(<span class="pl-k">-</span><span class="pl-c1">1</span><span class="pl-k">==</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">arrayIndexOf</span>(<span class="pl-smi">a</span>.<span class="pl-smi">ignore</span>,f))<span class="pl-k">if</span>(<span class="pl-k">-</span><span class="pl-c1">1</span><span class="pl-k">!=</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">arrayIndexOf</span>(<span class="pl-smi">a</span>.<span class="pl-smi">copy</span>,f))b[d]<span class="pl-k">=</span></td>
      </tr>
      <tr>
        <td id="L13" class="blob-num js-line-number" data-line-number="13"></td>
        <td id="LC13" class="blob-code blob-code-inner js-file-line">c[d];<span class="pl-k">else</span> <span class="pl-k">if</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>object<span class="pl-pds">&quot;</span></span><span class="pl-k">!=</span><span class="pl-k">typeof</span> c[d]<span class="pl-k">&amp;&amp;</span><span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span><span class="pl-k">!=</span><span class="pl-k">typeof</span> c[d]<span class="pl-k">&amp;&amp;</span><span class="pl-c1">0</span><span class="pl-k">&lt;</span><span class="pl-smi">a</span>.<span class="pl-smi">observe</span>.<span class="pl-c1">length</span><span class="pl-k">&amp;&amp;</span><span class="pl-k">-</span><span class="pl-c1">1</span><span class="pl-k">==</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">arrayIndexOf</span>(<span class="pl-smi">a</span>.<span class="pl-smi">observe</span>,f))b[d]<span class="pl-k">=</span>c[d],<span class="pl-smi">a</span>.<span class="pl-smi">copiedProperties</span>[f]<span class="pl-k">=</span><span class="pl-k">!</span><span class="pl-c1">0</span>;<span class="pl-k">else</span>{<span class="pl-k">var</span> g<span class="pl-k">=</span><span class="pl-smi">I</span>.<span class="pl-en">get</span>(c[d]),k<span class="pl-k">=</span><span class="pl-en">F</span>(b[d],c[d],a,d,b,f,b),g<span class="pl-k">=</span>g<span class="pl-k">||</span>k;<span class="pl-k">if</span>(<span class="pl-c1">0</span><span class="pl-k">&lt;</span><span class="pl-smi">a</span>.<span class="pl-smi">observe</span>.<span class="pl-c1">length</span><span class="pl-k">&amp;&amp;</span><span class="pl-k">-</span><span class="pl-c1">1</span><span class="pl-k">==</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">arrayIndexOf</span>(<span class="pl-smi">a</span>.<span class="pl-smi">observe</span>,f))b[d]<span class="pl-k">=</span><span class="pl-en">g</span>(),<span class="pl-smi">a</span>.<span class="pl-smi">copiedProperties</span>[f]<span class="pl-k">=</span><span class="pl-k">!</span><span class="pl-c1">0</span>;<span class="pl-k">else</span>{<span class="pl-k">if</span>(<span class="pl-smi">e</span>.<span class="pl-en">isWriteableObservable</span>(b[d])){<span class="pl-k">if</span>(g<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(g),b[d]()<span class="pl-k">!==</span>g)b[d](g)}<span class="pl-k">else</span> g<span class="pl-k">=</span><span class="pl-k">void</span> <span class="pl-c1">0</span><span class="pl-k">===</span>b[d]<span class="pl-k">?</span>g<span class="pl-k">:</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(g),b[d]<span class="pl-k">=</span>g;<span class="pl-smi">a</span>.<span class="pl-smi">mappedProperties</span>[f]<span class="pl-k">=</span><span class="pl-k">!</span><span class="pl-c1">0</span>}}})}<span class="pl-k">else</span> <span class="pl-k">switch</span>(<span class="pl-smi">f</span>.<span class="pl-en">getType</span>(c)){<span class="pl-k">case</span> <span class="pl-s"><span class="pl-pds">&quot;</span>function<span class="pl-pds">&quot;</span></span><span class="pl-k">:</span><span class="pl-en">u</span>()<span class="pl-k">?</span></td>
      </tr>
      <tr>
        <td id="L14" class="blob-num js-line-number" data-line-number="14"></td>
        <td id="LC14" class="blob-code blob-code-inner js-file-line"><span class="pl-smi">e</span>.<span class="pl-en">isWriteableObservable</span>(c)<span class="pl-k">?</span>(<span class="pl-en">c</span>(<span class="pl-en">v</span>(c)),b<span class="pl-k">=</span>c)<span class="pl-k">:</span>b<span class="pl-k">=</span><span class="pl-en">v</span>(c)<span class="pl-k">:</span>b<span class="pl-k">=</span>c;<span class="pl-k">break</span>;<span class="pl-k">default</span><span class="pl-k">:</span><span class="pl-k">if</span>(<span class="pl-smi">e</span>.<span class="pl-en">isWriteableObservable</span>(b))<span class="pl-k">return</span> q<span class="pl-k">=</span><span class="pl-en">u</span>()<span class="pl-k">?</span><span class="pl-en">v</span>(b)<span class="pl-k">:</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(c),<span class="pl-en">b</span>(q),q;<span class="pl-en">h</span>()<span class="pl-k">||</span><span class="pl-en">u</span>();b<span class="pl-k">=</span><span class="pl-en">h</span>()<span class="pl-k">?</span><span class="pl-en">x</span>()<span class="pl-k">:</span><span class="pl-smi">e</span>.<span class="pl-en">observable</span>(<span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(c));<span class="pl-en">u</span>()<span class="pl-k">&amp;&amp;</span><span class="pl-en">b</span>(<span class="pl-en">v</span>(b))}<span class="pl-k">return</span> b}<span class="pl-k">function</span> <span class="pl-en">O</span>(<span class="pl-smi">b</span>,<span class="pl-smi">c</span>,<span class="pl-smi">a</span>){<span class="pl-k">for</span>(<span class="pl-k">var</span> d<span class="pl-k">=</span><span class="pl-c1">0</span>,e<span class="pl-k">=</span><span class="pl-smi">b</span>.<span class="pl-c1">length</span>;d<span class="pl-k">&lt;</span>e;d<span class="pl-k">++</span>)<span class="pl-k">if</span>(<span class="pl-k">!</span><span class="pl-c1">0</span><span class="pl-k">!==</span>a[d]<span class="pl-k">&amp;&amp;</span>b[d]<span class="pl-k">===</span>c)<span class="pl-k">return</span> d;<span class="pl-k">return</span> <span class="pl-c1">null</span>}<span class="pl-k">function</span> <span class="pl-en">R</span>(<span class="pl-smi">b</span>,<span class="pl-smi">c</span>){<span class="pl-k">var</span> a;c<span class="pl-k">&amp;&amp;</span>(a<span class="pl-k">=</span><span class="pl-en">c</span>(b));<span class="pl-s"><span class="pl-pds">&quot;</span>undefined<span class="pl-pds">&quot;</span></span><span class="pl-k">===</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(a)<span class="pl-k">&amp;&amp;</span>(a<span class="pl-k">=</span>b);<span class="pl-k">return</span> <span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(a)}<span class="pl-k">function</span> <span class="pl-en">K</span>(<span class="pl-smi">b</span>,<span class="pl-smi">c</span>,<span class="pl-smi">a</span>){b<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(b);<span class="pl-k">for</span>(<span class="pl-k">var</span> d<span class="pl-k">=</span><span class="pl-c1">0</span>,f<span class="pl-k">=</span><span class="pl-smi">b</span>.<span class="pl-c1">length</span>;d<span class="pl-k">&lt;</span></td>
      </tr>
      <tr>
        <td id="L15" class="blob-num js-line-number" data-line-number="15"></td>
        <td id="LC15" class="blob-code blob-code-inner js-file-line">f;d<span class="pl-k">++</span>){<span class="pl-k">var</span> l<span class="pl-k">=</span>b[d];<span class="pl-k">if</span>(<span class="pl-en">R</span>(l,a)<span class="pl-k">===</span>c)<span class="pl-k">return</span> l}<span class="pl-k">throw</span> <span class="pl-en">Error</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>When calling ko.update*, the key &#39;<span class="pl-pds">&quot;</span></span><span class="pl-k">+</span>c<span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&quot;</span>&#39; was not found!<span class="pl-pds">&quot;</span></span>);}<span class="pl-k">function</span> <span class="pl-en">C</span>(<span class="pl-smi">b</span>,<span class="pl-smi">c</span>){<span class="pl-k">return</span> <span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">arrayMap</span>(<span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(b),<span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">return</span> c<span class="pl-k">?</span><span class="pl-en">R</span>(a,c)<span class="pl-k">:</span>a})}<span class="pl-k">function</span> <span class="pl-en">Q</span>(<span class="pl-smi">b</span>,<span class="pl-smi">c</span>){<span class="pl-k">if</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span><span class="pl-k">===</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(b))<span class="pl-k">for</span>(<span class="pl-k">var</span> a<span class="pl-k">=</span><span class="pl-c1">0</span>;a<span class="pl-k">&lt;</span><span class="pl-smi">b</span>.<span class="pl-c1">length</span>;a<span class="pl-k">++</span>)<span class="pl-en">c</span>(a);<span class="pl-k">else</span> <span class="pl-k">for</span>(a <span class="pl-k">in</span> b)<span class="pl-en">c</span>(a)}<span class="pl-k">function</span> <span class="pl-en">P</span>(<span class="pl-smi">b</span>){<span class="pl-k">var</span> c<span class="pl-k">=</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(b);<span class="pl-k">return</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>object<span class="pl-pds">&quot;</span></span><span class="pl-k">===</span>c<span class="pl-k">||</span><span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span><span class="pl-k">===</span>c)<span class="pl-k">&amp;&amp;</span><span class="pl-c1">null</span><span class="pl-k">!==</span>b}<span class="pl-k">function</span> <span class="pl-en">T</span>(){<span class="pl-k">var</span> b<span class="pl-k">=</span>[],c<span class="pl-k">=</span>[];<span class="pl-v">this</span>.<span class="pl-smi">save</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">a</span>,<span class="pl-smi">d</span>){<span class="pl-k">var</span> f<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">arrayIndexOf</span>(b,a);<span class="pl-c1">0</span><span class="pl-k">&lt;=</span>f<span class="pl-k">?</span>c[f]<span class="pl-k">=</span>d<span class="pl-k">:</span>(<span class="pl-smi">b</span>.<span class="pl-c1">push</span>(a),<span class="pl-smi">c</span>.<span class="pl-c1">push</span>(d))};</td>
      </tr>
      <tr>
        <td id="L16" class="blob-num js-line-number" data-line-number="16"></td>
        <td id="LC16" class="blob-code blob-code-inner js-file-line"><span class="pl-v">this</span>.<span class="pl-smi">get</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">a</span>){a<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">arrayIndexOf</span>(b,a);<span class="pl-k">return</span> <span class="pl-c1">0</span><span class="pl-k">&lt;=</span>a<span class="pl-k">?</span>c[a]<span class="pl-k">:</span><span class="pl-k">void</span> <span class="pl-c1">0</span>}}<span class="pl-k">function</span> <span class="pl-en">S</span>(){<span class="pl-k">var</span> b<span class="pl-k">=</span>{},<span class="pl-en">c</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">var</span> c;<span class="pl-k">try</span>{c<span class="pl-k">=</span>a}<span class="pl-k">catch</span>(e){c<span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">&quot;</span>$$$<span class="pl-pds">&quot;</span></span>}a<span class="pl-k">=</span>b[c];<span class="pl-k">void</span> <span class="pl-c1">0</span><span class="pl-k">===</span>a<span class="pl-k">&amp;&amp;</span>(a<span class="pl-k">=</span><span class="pl-k">new</span> <span class="pl-en">T</span>,b[c]<span class="pl-k">=</span>a);<span class="pl-k">return</span> a};<span class="pl-v">this</span>.<span class="pl-smi">save</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">a</span>,<span class="pl-smi">b</span>){<span class="pl-en">c</span>(a).<span class="pl-en">save</span>(a,b)};<span class="pl-v">this</span>.<span class="pl-smi">get</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">return</span> <span class="pl-en">c</span>(a).<span class="pl-en">get</span>(a)}}<span class="pl-k">var</span> p<span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">&quot;</span>__ko_mapping__<span class="pl-pds">&quot;</span></span>,H<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">dependentObservable</span>,B<span class="pl-k">=</span><span class="pl-c1">0</span>,G,I,L<span class="pl-k">=</span>[<span class="pl-s"><span class="pl-pds">&quot;</span>create<span class="pl-pds">&quot;</span></span>,<span class="pl-s"><span class="pl-pds">&quot;</span>update<span class="pl-pds">&quot;</span></span>,<span class="pl-s"><span class="pl-pds">&quot;</span>key<span class="pl-pds">&quot;</span></span>,<span class="pl-s"><span class="pl-pds">&quot;</span>arrayChanged<span class="pl-pds">&quot;</span></span>],N<span class="pl-k">=</span>{},x<span class="pl-k">=</span>{include<span class="pl-k">:</span>[<span class="pl-s"><span class="pl-pds">&quot;</span>_destroy<span class="pl-pds">&quot;</span></span>],ignore<span class="pl-k">:</span>[],copy<span class="pl-k">:</span>[],observe<span class="pl-k">:</span>[]},j<span class="pl-k">=</span>x;<span class="pl-c1">f</span>.<span class="pl-en">isMapped</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">b</span>){<span class="pl-k">return</span>(b<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(b))<span class="pl-k">&amp;&amp;</span>b[p]};<span class="pl-smi">f</span>.<span class="pl-smi">fromJS</span><span class="pl-k">=</span></td>
      </tr>
      <tr>
        <td id="L17" class="blob-num js-line-number" data-line-number="17"></td>
        <td id="LC17" class="blob-code blob-code-inner js-file-line"><span class="pl-k">function</span>(<span class="pl-smi">b</span>){<span class="pl-k">if</span>(<span class="pl-c1">0</span><span class="pl-k">==</span><span class="pl-smi">arguments</span>.<span class="pl-c1">length</span>)<span class="pl-k">throw</span> <span class="pl-en">Error</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>When calling ko.fromJS, pass the object you want to convert.<span class="pl-pds">&quot;</span></span>);<span class="pl-k">try</span>{B<span class="pl-k">++</span><span class="pl-k">||</span>(G<span class="pl-k">=</span>[],I<span class="pl-k">=</span><span class="pl-k">new</span> <span class="pl-en">S</span>);<span class="pl-k">var</span> c,a;<span class="pl-c1">2</span><span class="pl-k">==</span><span class="pl-smi">arguments</span>.<span class="pl-c1">length</span><span class="pl-k">&amp;&amp;</span>(arguments[<span class="pl-c1">1</span>][p]<span class="pl-k">?</span>a<span class="pl-k">=</span>arguments[<span class="pl-c1">1</span>]<span class="pl-k">:</span>c<span class="pl-k">=</span>arguments[<span class="pl-c1">1</span>]);<span class="pl-c1">3</span><span class="pl-k">==</span><span class="pl-smi">arguments</span>.<span class="pl-c1">length</span><span class="pl-k">&amp;&amp;</span>(c<span class="pl-k">=</span>arguments[<span class="pl-c1">1</span>],a<span class="pl-k">=</span>arguments[<span class="pl-c1">2</span>]);a<span class="pl-k">&amp;&amp;</span>(c<span class="pl-k">=</span><span class="pl-en">E</span>(c,a[p]));c<span class="pl-k">=</span><span class="pl-en">z</span>(c);<span class="pl-k">var</span> d<span class="pl-k">=</span><span class="pl-en">F</span>(a,b,c);a<span class="pl-k">&amp;&amp;</span>(d<span class="pl-k">=</span>a);<span class="pl-k">if</span>(<span class="pl-k">!</span><span class="pl-k">--</span>B)<span class="pl-k">for</span>(;<span class="pl-smi">G</span>.<span class="pl-c1">length</span>;){<span class="pl-k">var</span> e<span class="pl-k">=</span><span class="pl-smi">G</span>.<span class="pl-c1">pop</span>();e<span class="pl-k">&amp;&amp;</span>(<span class="pl-en">e</span>(),<span class="pl-smi">e</span>.<span class="pl-smi">__DO</span>.<span class="pl-smi">throttleEvaluation</span><span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">throttleEvaluation</span>)}d[p]<span class="pl-k">=</span><span class="pl-en">E</span>(d[p],c);<span class="pl-k">return</span> d}<span class="pl-k">catch</span>(f){<span class="pl-k">throw</span> B<span class="pl-k">=</span><span class="pl-c1">0</span>,f;}};<span class="pl-c1">f</span>.<span class="pl-en">fromJSON</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">b</span>){<span class="pl-k">var</span> c<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">parseJson</span>(b);</td>
      </tr>
      <tr>
        <td id="L18" class="blob-num js-line-number" data-line-number="18"></td>
        <td id="LC18" class="blob-code blob-code-inner js-file-line">arguments[<span class="pl-c1">0</span>]<span class="pl-k">=</span>c;<span class="pl-k">return</span> <span class="pl-smi">f</span>.<span class="pl-smi">fromJS</span>.<span class="pl-c1">apply</span>(<span class="pl-v">this</span>,arguments)};<span class="pl-c1">f</span>.<span class="pl-en">updateFromJS</span><span class="pl-k">=</span><span class="pl-k">function</span>(){<span class="pl-k">throw</span> <span class="pl-en">Error</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>ko.mapping.updateFromJS, use ko.mapping.fromJS instead. Please note that the order of parameters is different!<span class="pl-pds">&quot;</span></span>);};<span class="pl-c1">f</span>.<span class="pl-en">updateFromJSON</span><span class="pl-k">=</span><span class="pl-k">function</span>(){<span class="pl-k">throw</span> <span class="pl-en">Error</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>ko.mapping.updateFromJSON, use ko.mapping.fromJSON instead. Please note that the order of parameters is different!<span class="pl-pds">&quot;</span></span>);};<span class="pl-c1">f</span>.<span class="pl-en">toJS</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">b</span>,<span class="pl-smi">c</span>){j<span class="pl-k">||</span><span class="pl-smi">f</span>.<span class="pl-en">resetDefaultOptions</span>();<span class="pl-k">if</span>(<span class="pl-c1">0</span><span class="pl-k">==</span><span class="pl-smi">arguments</span>.<span class="pl-c1">length</span>)<span class="pl-k">throw</span> <span class="pl-en">Error</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>When calling ko.mapping.toJS, pass the object you want to convert.<span class="pl-pds">&quot;</span></span>);</td>
      </tr>
      <tr>
        <td id="L19" class="blob-num js-line-number" data-line-number="19"></td>
        <td id="LC19" class="blob-code blob-code-inner js-file-line"><span class="pl-k">if</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span><span class="pl-k">!==</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(<span class="pl-smi">j</span>.<span class="pl-smi">ignore</span>))<span class="pl-k">throw</span> <span class="pl-en">Error</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>ko.mapping.defaultOptions().ignore should be an array.<span class="pl-pds">&quot;</span></span>);<span class="pl-k">if</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span><span class="pl-k">!==</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(<span class="pl-smi">j</span>.<span class="pl-smi">include</span>))<span class="pl-k">throw</span> <span class="pl-en">Error</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>ko.mapping.defaultOptions().include should be an array.<span class="pl-pds">&quot;</span></span>);<span class="pl-k">if</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span><span class="pl-k">!==</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(<span class="pl-smi">j</span>.<span class="pl-smi">copy</span>))<span class="pl-k">throw</span> <span class="pl-en">Error</span>(<span class="pl-s"><span class="pl-pds">&quot;</span>ko.mapping.defaultOptions().copy should be an array.<span class="pl-pds">&quot;</span></span>);c<span class="pl-k">=</span><span class="pl-en">z</span>(c,b[p]);<span class="pl-k">return</span> <span class="pl-smi">f</span>.<span class="pl-en">visitModel</span>(b,<span class="pl-k">function</span>(<span class="pl-smi">a</span>){<span class="pl-k">return</span> <span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(a)},c)};<span class="pl-c1">f</span>.<span class="pl-en">toJSON</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">b</span>,<span class="pl-smi">c</span>){<span class="pl-k">var</span> a<span class="pl-k">=</span><span class="pl-smi">f</span>.<span class="pl-en">toJS</span>(b,c);<span class="pl-k">return</span> <span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">stringifyJson</span>(a)};<span class="pl-c1">f</span>.<span class="pl-en">defaultOptions</span><span class="pl-k">=</span><span class="pl-k">function</span>(){<span class="pl-k">if</span>(<span class="pl-c1">0</span><span class="pl-k">&lt;</span><span class="pl-smi">arguments</span>.<span class="pl-c1">length</span>)j<span class="pl-k">=</span></td>
      </tr>
      <tr>
        <td id="L20" class="blob-num js-line-number" data-line-number="20"></td>
        <td id="LC20" class="blob-code blob-code-inner js-file-line">arguments[<span class="pl-c1">0</span>];<span class="pl-k">else</span> <span class="pl-k">return</span> j};<span class="pl-c1">f</span>.<span class="pl-en">resetDefaultOptions</span><span class="pl-k">=</span><span class="pl-k">function</span>(){j<span class="pl-k">=</span>{include<span class="pl-k">:</span><span class="pl-smi">x</span>.<span class="pl-smi">include</span>.<span class="pl-c1">slice</span>(<span class="pl-c1">0</span>),ignore<span class="pl-k">:</span><span class="pl-smi">x</span>.<span class="pl-smi">ignore</span>.<span class="pl-c1">slice</span>(<span class="pl-c1">0</span>),copy<span class="pl-k">:</span><span class="pl-smi">x</span>.<span class="pl-smi">copy</span>.<span class="pl-c1">slice</span>(<span class="pl-c1">0</span>)}};<span class="pl-c1">f</span>.<span class="pl-en">getType</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">b</span>){<span class="pl-k">if</span>(b<span class="pl-k">&amp;&amp;</span><span class="pl-s"><span class="pl-pds">&quot;</span>object<span class="pl-pds">&quot;</span></span><span class="pl-k">===</span><span class="pl-k">typeof</span> b){<span class="pl-k">if</span>(<span class="pl-smi">b</span>.<span class="pl-c1">constructor</span><span class="pl-k">===</span><span class="pl-c1">Date</span>)<span class="pl-k">return</span><span class="pl-s"><span class="pl-pds">&quot;</span>date<span class="pl-pds">&quot;</span></span>;<span class="pl-k">if</span>(<span class="pl-smi">b</span>.<span class="pl-c1">constructor</span><span class="pl-k">===</span><span class="pl-c1">Array</span>)<span class="pl-k">return</span><span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span>}<span class="pl-k">return</span> <span class="pl-k">typeof</span> b};<span class="pl-c1">f</span>.<span class="pl-en">visitModel</span><span class="pl-k">=</span><span class="pl-k">function</span>(<span class="pl-smi">b</span>,<span class="pl-smi">c</span>,<span class="pl-smi">a</span>){a<span class="pl-k">=</span>a<span class="pl-k">||</span>{};<span class="pl-smi">a</span>.<span class="pl-smi">visitedObjects</span><span class="pl-k">=</span><span class="pl-smi">a</span>.<span class="pl-smi">visitedObjects</span><span class="pl-k">||</span><span class="pl-k">new</span> <span class="pl-en">S</span>;<span class="pl-k">var</span> d,k<span class="pl-k">=</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(b);<span class="pl-k">if</span>(<span class="pl-en">P</span>(k))a<span class="pl-k">=</span><span class="pl-en">z</span>(a,k[p]),<span class="pl-en">c</span>(b,<span class="pl-smi">a</span>.<span class="pl-smi">parentName</span>),d<span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span><span class="pl-k">===</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(k)<span class="pl-k">?</span>[]<span class="pl-k">:</span>{};<span class="pl-k">else</span> <span class="pl-k">return</span> <span class="pl-en">c</span>(b,<span class="pl-smi">a</span>.<span class="pl-smi">parentName</span>);<span class="pl-smi">a</span>.<span class="pl-smi">visitedObjects</span>.<span class="pl-en">save</span>(b,</td>
      </tr>
      <tr>
        <td id="L21" class="blob-num js-line-number" data-line-number="21"></td>
        <td id="LC21" class="blob-code blob-code-inner js-file-line">d);<span class="pl-k">var</span> l<span class="pl-k">=</span><span class="pl-smi">a</span>.<span class="pl-smi">parentName</span>;<span class="pl-en">Q</span>(k,<span class="pl-k">function</span>(<span class="pl-smi">b</span>){<span class="pl-k">if</span>(<span class="pl-k">!</span>(<span class="pl-smi">a</span>.<span class="pl-smi">ignore</span><span class="pl-k">&amp;&amp;</span><span class="pl-k">-</span><span class="pl-c1">1</span><span class="pl-k">!=</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">arrayIndexOf</span>(<span class="pl-smi">a</span>.<span class="pl-smi">ignore</span>,b))){<span class="pl-k">var</span> j<span class="pl-k">=</span>k[b],g<span class="pl-k">=</span>a,h<span class="pl-k">=</span>l<span class="pl-k">||</span><span class="pl-s"><span class="pl-pds">&quot;</span><span class="pl-pds">&quot;</span></span>;<span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span><span class="pl-k">===</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(k)<span class="pl-k">?</span>l<span class="pl-k">&amp;&amp;</span>(h<span class="pl-k">+=</span><span class="pl-s"><span class="pl-pds">&quot;</span>[<span class="pl-pds">&quot;</span></span><span class="pl-k">+</span>b<span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&quot;</span>]<span class="pl-pds">&quot;</span></span>)<span class="pl-k">:</span>(l<span class="pl-k">&amp;&amp;</span>(h<span class="pl-k">+=</span><span class="pl-s"><span class="pl-pds">&quot;</span>.<span class="pl-pds">&quot;</span></span>),h<span class="pl-k">+=</span>b);<span class="pl-smi">g</span>.<span class="pl-smi">parentName</span><span class="pl-k">=</span>h;<span class="pl-k">if</span>(<span class="pl-k">!</span>(<span class="pl-k">-</span><span class="pl-c1">1</span><span class="pl-k">===</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">arrayIndexOf</span>(<span class="pl-smi">a</span>.<span class="pl-smi">copy</span>,b)<span class="pl-k">&amp;&amp;</span><span class="pl-k">-</span><span class="pl-c1">1</span><span class="pl-k">===</span><span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">arrayIndexOf</span>(<span class="pl-smi">a</span>.<span class="pl-smi">include</span>,b)<span class="pl-k">&amp;&amp;</span>k[p]<span class="pl-k">&amp;&amp;</span>k[p].<span class="pl-smi">mappedProperties</span><span class="pl-k">&amp;&amp;!</span>k[p].<span class="pl-smi">mappedProperties</span>[b]<span class="pl-k">&amp;&amp;</span>k[p].<span class="pl-smi">copiedProperties</span><span class="pl-k">&amp;&amp;!</span>k[p].<span class="pl-smi">copiedProperties</span>[b]<span class="pl-k">&amp;&amp;</span><span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span><span class="pl-k">!==</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(k)))<span class="pl-k">switch</span>(<span class="pl-smi">f</span>.<span class="pl-en">getType</span>(<span class="pl-smi">e</span>.<span class="pl-smi">utils</span>.<span class="pl-en">unwrapObservable</span>(j))){<span class="pl-k">case</span> <span class="pl-s"><span class="pl-pds">&quot;</span>object<span class="pl-pds">&quot;</span></span><span class="pl-k">:</span><span class="pl-k">case</span> <span class="pl-s"><span class="pl-pds">&quot;</span>array<span class="pl-pds">&quot;</span></span><span class="pl-k">:</span><span class="pl-k">case</span> <span class="pl-s"><span class="pl-pds">&quot;</span>undefined<span class="pl-pds">&quot;</span></span><span class="pl-k">:</span>g<span class="pl-k">=</span><span class="pl-smi">a</span>.<span class="pl-smi">visitedObjects</span>.<span class="pl-en">get</span>(j);</td>
      </tr>
      <tr>
        <td id="L22" class="blob-num js-line-number" data-line-number="22"></td>
        <td id="LC22" class="blob-code blob-code-inner js-file-line">d[b]<span class="pl-k">=</span><span class="pl-s"><span class="pl-pds">&quot;</span>undefined<span class="pl-pds">&quot;</span></span><span class="pl-k">!==</span><span class="pl-smi">f</span>.<span class="pl-en">getType</span>(g)<span class="pl-k">?</span>g<span class="pl-k">:</span><span class="pl-smi">f</span>.<span class="pl-en">visitModel</span>(j,c,a);<span class="pl-k">break</span>;<span class="pl-k">default</span><span class="pl-k">:</span>d[b]<span class="pl-k">=</span><span class="pl-en">c</span>(j,<span class="pl-smi">a</span>.<span class="pl-smi">parentName</span>)}}});<span class="pl-k">return</span> d}});</td>
      </tr>
</table>

  </div>

</div>

<a href="#jump-to-line" rel="facebox[.linejump]" data-hotkey="l" style="display:none">Jump to Line</a>
<div id="jump-to-line" style="display:none">
  <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="" class="js-jump-to-line-form" method="get"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div>
    <input class="linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;" aria-label="Jump to line" autofocus>
    <button type="submit" class="btn">Go</button>
</form></div>

  </div>
  <div class="modal-backdrop"></div>
</div>

    </div>
  </div>

    </div>

        <div class="container">
  <div class="site-footer" role="contentinfo">
    <ul class="site-footer-links right">
        <li><a href="https://status.github.com/" data-ga-click="Footer, go to status, text:status">Status</a></li>
      <li><a href="https://developer.github.com" data-ga-click="Footer, go to api, text:api">API</a></li>
      <li><a href="https://training.github.com" data-ga-click="Footer, go to training, text:training">Training</a></li>
      <li><a href="https://shop.github.com" data-ga-click="Footer, go to shop, text:shop">Shop</a></li>
        <li><a href="https://github.com/blog" data-ga-click="Footer, go to blog, text:blog">Blog</a></li>
        <li><a href="https://github.com/about" data-ga-click="Footer, go to about, text:about">About</a></li>
        <li><a href="https://github.com/pricing" data-ga-click="Footer, go to pricing, text:pricing">Pricing</a></li>

    </ul>

    <a href="https://github.com" aria-label="Homepage">
      <span aria-hidden="true" class="mega-octicon octicon-mark-github" title="GitHub "></span>
</a>
    <ul class="site-footer-links">
      <li>&copy; 2016 <span title="0.04656s from github-fe138-cp1-prd.iad.github.net">GitHub</span>, Inc.</li>
        <li><a href="https://github.com/site/terms" data-ga-click="Footer, go to terms, text:terms">Terms</a></li>
        <li><a href="https://github.com/site/privacy" data-ga-click="Footer, go to privacy, text:privacy">Privacy</a></li>
        <li><a href="https://github.com/security" data-ga-click="Footer, go to security, text:security">Security</a></li>
        <li><a href="https://github.com/contact" data-ga-click="Footer, go to contact, text:contact">Contact</a></li>
        <li><a href="https://help.github.com" data-ga-click="Footer, go to help, text:help">Help</a></li>
    </ul>
  </div>
</div>



    
    
    

    <div id="ajax-error-message" class="flash flash-error">
      <span aria-hidden="true" class="octicon octicon-alert"></span>
      <button type="button" class="flash-close js-flash-close js-ajax-error-dismiss" aria-label="Dismiss error">
        <span aria-hidden="true" class="octicon octicon-x"></span>
      </button>
      Something went wrong with that request. Please try again.
    </div>


      <script crossorigin="anonymous" integrity="sha256-7460qJ7p88i3YTMH/liaj1cFgX987ie+xRzl6WMjSr8=" src="https://assets-cdn.github.com/assets/frameworks-ef8eb4a89ee9f3c8b7613307fe589a8f5705817f7cee27bec51ce5e963234abf.js"></script>
      <script async="async" crossorigin="anonymous" integrity="sha256-EZvEsORh7UDNi4EQkE3lUPeIa8Au/SUQnfJ0Ayi65w0=" src="https://assets-cdn.github.com/assets/github-119bc4b0e461ed40cd8b8110904de550f7886bc02efd25109df2740328bae70d.js"></script>
      
      
      
    <div class="js-stale-session-flash stale-session-flash flash flash-warn flash-banner hidden">
      <span aria-hidden="true" class="octicon octicon-alert"></span>
      <span class="signed-in-tab-flash">You signed in with another tab or window. <a href="">Reload</a> to refresh your session.</span>
      <span class="signed-out-tab-flash">You signed out in another tab or window. <a href="">Reload</a> to refresh your session.</span>
    </div>
  </body>
</html>

