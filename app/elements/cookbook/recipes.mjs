export default function CookbookRecipes ({ html }) {
  return html`
    <cookbook-recipe-box>
      <cookbook-recipe-card name="Render Markdown" type="walkthrough" href="/cookbook/render-markdown">
        <p slot="description">
        Use Arcdown to render Markdown content into your Enhance app.
        </p>
      </cookbook-recipe-card>

      <cookbook-recipe-card name="Use event listeners" type="walkthrough" href="/cookbook/use-event-listeners">
        <p slot="description">
        Use DOM events to respond to dynamic user input.
        </p>
      </cookbook-recipe-card>

      <cookbook-recipe-card name="Validate forms" type="walkthrough" href="/cookbook/validate-forms">
        <p slot="description">
        Improve UX and prevent errors by validating forms on the client and the server.
        </p>
      </cookbook-recipe-card>

      <cookbook-recipe-card name="Roll your own auth" type="article" href="/cookbook/roll-your-own-auth">
        <p slot="description">
        Learn how to implement authentication, securely and effectively.
        </p>
      </cookbook-recipe-card>

      <cookbook-recipe-card name="Build for the browser" type="walkthrough" href="/cookbook/build-for-the-browser">
        <p slot="description">
        Ship and run code on the browser within a server side rendered Enhance app.
        </p>
      </cookbook-recipe-card>

      <cookbook-recipe-card name="Write unit tests" type="walkthrough" href="/cookbook/write-unit-tests">
        <p slot="description">
        Test Enhance elements and API routes.
        </p>
      </cookbook-recipe-card>

      <cookbook-recipe-card name="Migrate from Architect" type="walkthrough" href="/cookbook/migrate-from-architect">
        <p slot="description">
        Learn how to migrate your Architect app to an Enhance app.
        </p>
      </cookbook-recipe-card>

    </cookbook-recipe-box>
  `
}
