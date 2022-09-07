import templateLodash from "lodash.template";

export const templateButton = templateLodash('<button type="button" class="button">Load more</button>');

export const templateListCards = templateLodash(
    '<a class="gallery-item" href="<%=largeImageURL%>"><div class="gallery-card"><div class="gallery-photo"><img class="gallery-img" src="<%=webformatURL%>" alt="<%=tags%>" loading="lazy" /></div><div class="gallery-info"><p class="gallery-info-item"><b>Likes</b><%=likes%></p><p class="gallery-info-item"><b>Views</b><%=views%></p><p class="gallery-info-item"><b>Comments</b><%=comments%></p><p class="gallery-info-item"><b>Downloads</b><%=downloads%></p></div></div></a>'
);

