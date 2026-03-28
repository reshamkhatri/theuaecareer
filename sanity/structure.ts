import { CommentIcon } from '@sanity/icons';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pending Comments')
        .icon(CommentIcon)
        .child(
          S.documentList()
            .title('Pending Comments')
            .filter('_type == "comment" && status == "pending"')
            .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
        ),
      ...S.documentTypeListItems().filter((item) => item.getId() !== 'comment'),
      S.documentTypeListItem('comment').title('All Comments').icon(CommentIcon),
    ])
