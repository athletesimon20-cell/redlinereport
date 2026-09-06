import type { StructureResolver } from "sanity/structure";

const GEAR_TYPES: { type: string; title: string }[] = [
  { type: "helmetReview", title: "Helmets" },
  { type: "jacketReview", title: "Jackets" },
  { type: "gloveReview", title: "Gloves" },
  { type: "bootReview", title: "Boots" },
  { type: "communicatorReview", title: "Communicators" },
  { type: "luggageReview", title: "Luggage" },
  { type: "suitReview", title: "Suits" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Redline Report")
    .items([
      S.listItem()
        .title("Gear reviews")
        .child(
          S.list()
            .title("Gear reviews")
            .items(
              GEAR_TYPES.map(({ type, title }) =>
                S.listItem()
                  .title(title)
                  .child(S.documentTypeList(type).title(title))
              )
            )
        ),
      S.documentTypeListItem("bikeReview").title("Bike reviews"),
      S.divider(),
      S.listItem()
        .title("Legacy")
        .child(
          S.documentList()
            .title("Legacy (discontinued)")
            .filter("legacy == true")
        ),
      S.divider(),
      S.documentTypeListItem("author").title("Riders"),
      S.divider(),
      // Singleton — always the same one document (_id "siteStory"), edited
      // directly rather than picked from a list. Backs the About page's
      // founder bio and origin story.
      S.listItem()
        .title("About Page Content")
        .id("siteStory")
        .child(S.document().schemaType("siteStory").documentId("siteStory")),
    ]);
