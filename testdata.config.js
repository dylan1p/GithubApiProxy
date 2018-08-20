module.exports = {
  testUserDetails: [
    {
      username: "testuser1",
      password: "password"
    },
    {
      username: "testuser2",
      password: "password"
    }
  ],
  mockSearchResults: {
    total_count: 4,
    incomplete_results: false,
    items: [
      {
        login: "TomazJunior",
        id: 2294548,
        node_id: "MDQ6VXNlcjIyOTQ1NDg=",
        avatar_url: "https://avatars2.githubusercontent.com/u/2294548?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/TomazJunior",
        html_url: "https://github.com/TomazJunior",
        followers_url: "https://api.github.com/users/TomazJunior/followers",
        following_url:
          "https://api.github.com/users/TomazJunior/following{/other_user}",
        gists_url: "https://api.github.com/users/TomazJunior/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/TomazJunior/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/TomazJunior/subscriptions",
        organizations_url: "https://api.github.com/users/TomazJunior/orgs",
        repos_url: "https://api.github.com/users/TomazJunior/repos",
        events_url: "https://api.github.com/users/TomazJunior/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/TomazJunior/received_events",
        type: "User",
        site_admin: false,
        score: 23.975185
      },
      {
        login: "TLohan",
        id: 5203996,
        node_id: "MDQ6VXNlcjUyMDM5OTY=",
        avatar_url: "https://avatars0.githubusercontent.com/u/5203996?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/TLohan",
        html_url: "https://github.com/TLohan",
        followers_url: "https://api.github.com/users/TLohan/followers",
        following_url:
          "https://api.github.com/users/TLohan/following{/other_user}",
        gists_url: "https://api.github.com/users/TLohan/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/TLohan/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/TLohan/subscriptions",
        organizations_url: "https://api.github.com/users/TLohan/orgs",
        repos_url: "https://api.github.com/users/TLohan/repos",
        events_url: "https://api.github.com/users/TLohan/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/TLohan/received_events",
        type: "User",
        site_admin: false,
        score: 12.089117
      },
      {
        login: "tomaszwaraksa",
        id: 1721566,
        node_id: "MDQ6VXNlcjE3MjE1NjY=",
        avatar_url: "https://avatars0.githubusercontent.com/u/1721566?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/tomaszwaraksa",
        html_url: "https://github.com/tomaszwaraksa",
        followers_url: "https://api.github.com/users/tomaszwaraksa/followers",
        following_url:
          "https://api.github.com/users/tomaszwaraksa/following{/other_user}",
        gists_url: "https://api.github.com/users/tomaszwaraksa/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/tomaszwaraksa/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/tomaszwaraksa/subscriptions",
        organizations_url: "https://api.github.com/users/tomaszwaraksa/orgs",
        repos_url: "https://api.github.com/users/tomaszwaraksa/repos",
        events_url:
          "https://api.github.com/users/tomaszwaraksa/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/tomaszwaraksa/received_events",
        type: "User",
        site_admin: false,
        score: 11.453988
      },
      {
        login: "tkostus",
        id: 9673785,
        node_id: "MDQ6VXNlcjk2NzM3ODU=",
        avatar_url: "https://avatars0.githubusercontent.com/u/9673785?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/tkostus",
        html_url: "https://github.com/tkostus",
        followers_url: "https://api.github.com/users/tkostus/followers",
        following_url:
          "https://api.github.com/users/tkostus/following{/other_user}",
        gists_url: "https://api.github.com/users/tkostus/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/tkostus/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/tkostus/subscriptions",
        organizations_url: "https://api.github.com/users/tkostus/orgs",
        repos_url: "https://api.github.com/users/tkostus/repos",
        events_url: "https://api.github.com/users/tkostus/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/tkostus/received_events",
        type: "User",
        site_admin: false,
        score: 6.8760076
      }
    ]
  },
  expectedSearchResult: [
    {
      avatar_url: "https://avatars2.githubusercontent.com/u/2294548?v=4",
      id: 2294548,
      login: "TomazJunior",
      score: 23.975185,
      url: "https://api.github.com/users/TomazJunior"
    },
    {
      avatar_url: "https://avatars0.githubusercontent.com/u/5203996?v=4",
      id: 5203996,
      login: "TLohan",
      score: 12.089117,
      url: "https://api.github.com/users/TLohan"
    },
    {
      avatar_url: "https://avatars0.githubusercontent.com/u/1721566?v=4",
      id: 1721566,
      login: "tomaszwaraksa",
      score: 11.453988,
      url: "https://api.github.com/users/tomaszwaraksa"
    },
    {
      avatar_url: "https://avatars0.githubusercontent.com/u/9673785?v=4",
      id: 9673785,
      login: "tkostus",
      score: 6.8760076,
      url: "https://api.github.com/users/tkostus"
    }
  ],
  mockPost: {
    title: "Test title",
    body: "Some text ....",
    picture: "https://avatars2.githubusercontent.com/u/5624453?v=4"
  }
};
