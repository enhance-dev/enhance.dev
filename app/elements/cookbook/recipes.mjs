export default function CookbookRecipes ({ html }) {
  return html`
    <cookbook-recipe-box>
      <cookbook-recipe-card name="Render Markdown" href="/cookbook/render-markdown">
        <p slot="description">
        Use Arcdown to render Markdown content into your Enhance app.
        </p>
      </cookbook-recipe-card>

      <cookbook-recipe-card name="Use event listeners" href="/cookbook/use-event-listeners">
        <p slot="description">
        Use DOM events to respond to dynamic user input.
        </p>
      </cookbook-recipe-card>

      <cookbook-recipe-card name="Validate forms" href="/cookbook/validate-forms">
        <p slot="description">
        Improve UX and prevent errors by validating forms on the client and the server.
        </p>
      </cookbook-recipe-card>

      <cookbook-recipe-card name="Build for the browser" href="/cookbook/build-for-the-browser">
        <p slot="description">
        Ship and run code on the browser within a server side rendered Enhance app.
        </p>
      </cookbook-recipe-card>

      <cookbook-recipe-card name="Write unit tests" href="/cookbook/write-unit-tests">
        <p slot="description">
        Test Enhance elements and API routes.
        </p>
      </cookbook-recipe-card>

      <cookbook-recipe-card name="Migrate from Architect" href="/cookbook/migrate-from-architect">
        <p slot="description">
        Learn how to migrate your Architect app to an Enhance app.
        </p>
      </cookbook-recipe-card>

      <cookbook-recipe-card name="Translate React syntax to Enhance elements" href="/cookbook/translate-react">
        <p slot="description">
        Watch out for common gotchas when coming from React and JSX.
        </p>
      </cookbook-recipe-card>

    </cookbook-recipe-box>
  `
}
