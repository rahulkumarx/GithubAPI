$('.search-button').click(function(){
  $(this).parent().toggleClass('open');
});

const GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: GITHUB_SEARCH_URL,
    data: {
      q: `${searchTerm} in:name`,
      per_page: 0
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function renderResult(result) {
  return `
  <div class="card panel panel-primary">
	  <div class="panel-heading"><span>Repository Name - <a class="js-result-name" href="${result.html_url}" target="_blank">${result.name}</a></span></div>
		  <div class="panel-body">
					<span class="language">Language - ${result.language}</span><br>
					<span class="html_url">Repository Link - <a class="js-html_url" href="${result.html_url}" target="_blank">${result.html_url}</a></span><br>
					<span class="description">Description - ${result.description}</span><br>
					<span class="forks_count">Forks - ${result.forks_count}</span><br>
					<span class="open_issues">Number of open issues - ${result.open_issues}</span>
					
		  </div> 
	  <div class="panel-footer"><span>OWNER - <a href="${result.owner.html_url}" target="_blank">${result.owner.login}</a></span>
					<span class="js-watchers-count" style="float:right">Number of watchers - ${result.watchers_count}</span>
					
	  </div>
  </div>
  `;
}

function displayGitHubSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayGitHubSearchData);
  });
}

$(watchSubmit);
