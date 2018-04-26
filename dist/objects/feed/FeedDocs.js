var FeedDocs=function(){"use strict";var e=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.default=e.default};return e.default={feed:"Required. string or array of strings. This may either be one RSS feed or an array of feeds. Arrays of feeds will be combined and posts will be ordered by date. Currently, this only works with Medium RSS feeds.",selector:'"#js-feed"(default) or other string. The DOM element selector for your feed. The inner html of this element will be replaced with the feed.',type:'"medium"(default) or other string. The feed type. Currently, only Medium feeds are supported so this shouldn\'t change.',title:"The title of the feed that appears in the header. By default this uses the feed's title. However, if using displaying multiple fields this should be set. Otherwise, it will use the last feed title that was loaded.",titleUrl:"The url that the title links to. By default this uses the feed's url. However, if using displaying multiple fields this should be set. Otherwise, it will use the last feed url that was loaded.",profileImg:"The url to the profile image. By default this uses the feed's profile image. However, if using displaying multiple fields this should be set.  Otherwise, it will use the last feed image that was loaded.",fontSize:"Any valid css font-size value and unit (em, px, %, etc.). Set this to a smaller percentage (say, 85%) to make the feed appear more compact in smaller columns",ratioProfile:'array of two strings. Pixel numbers without "px" unit. Image source attribute width and height for the account avatar.',postBorderColor:"Any valid css border-color value. Set the color of the borders in the feed. All of the colors in the feed will inherit the style of the page except for the borders between cards. This may be any standard CSS color variable.",postImgHeight:'Pixel value with "px" unit. CSS height of the post image. The width of the image defaults to 100% the width of the post.',postExcerptLength:"This is the length of the excerpt.",postExcerptTrail:"Setting this will override the trailing ellipsis for excerpts.",postCtaText:"This is the text for each post's call to action.",postDateLocal:"The date formatting uses Date.toLocaleDateString(). The options in postDateLocal and postDateFormat are passed as Date.toLocaleDateString(postDateLocal, postDateFormat). Refer to the documentation on Date.toLocaleDateString() here: developer.mozilla.org.",postDateFormat:"This is a parameter used by Date.toLocaleDateString(), Refer to the documentation above for configuration details.",postDateTitle:"This is the title set to the published date element to provide context on mouseover.",classes:{wrapper:'"o-feed-2column" or "o-feed-3column" are available in the feed stylesheet to change the Feed items layout to 2 or 3 columns. However, any additional string can be input here to add classes to to the widget wrapper. This and other classes are available for the Medium template only. If you create your own template these will not be exposed to them automatically. See the Medium template example to see how they are added.',header:"Adds classes to the widget header above the post list.",url:"Adds classes to to the feeds's url.",feedItem:"Adds classes to to the feeds's posts.",title:"Adds classes to to the title of each card.",link:"Adds classes to to the link of each card.",thumbnail:"Adds classes to to the thumbnail image of each card.",excerpt:"Adds classes to to the excerpt of each card.",itemFooter:"Adds classes to to the footer of each card with the cta and date.",cta:"Adds classes to to the final call to action of each card.",date:"Adds classes to to the publication date of each card."},templates:{opener:"The opening template tag or wrapper of the entire feed. Add blank string to remove these component. This is where you would insert a custom LoDash template for the feed to parse.",header:"The header template that sits at the top of the posts.",posts:"The posts loop including the posts template.",closer:"The closing template tag or wrapper of the entire feed."},log:"false(default) or true. Enables logging data to the console. You will want this turned off in every case unless you are creating a template and need to see the data being passed to it.",unique:"false(default) or true. When using multiple feeds some Medium articles can be duplicated between publications. If you want unique posts by title switch this to true. There is no prioritization of which post will show up."},e}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmVlZERvY3MuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vYmplY3RzL2ZlZWQvRmVlZERvY3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERlcGVuZGVuY2llc1xuICovXG5cbmNsYXNzIEZlZWREb2NzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kZWZhdWx0ID0gRmVlZERvY3MuZGVmYXVsdDtcbiAgfVxufVxuXG5GZWVkRG9jcy5kZWZhdWx0ID0ge1xuICBmZWVkOiAnUmVxdWlyZWQuIHN0cmluZyBvciBhcnJheSBvZiBzdHJpbmdzLiBUaGlzIG1heSBlaXRoZXIgYmUgb25lIFJTUyBmZWVkIG9yIGFuIGFycmF5IG9mIGZlZWRzLiBBcnJheXMgb2YgZmVlZHMgd2lsbCBiZSBjb21iaW5lZCBhbmQgcG9zdHMgd2lsbCBiZSBvcmRlcmVkIGJ5IGRhdGUuIEN1cnJlbnRseSwgdGhpcyBvbmx5IHdvcmtzIHdpdGggTWVkaXVtIFJTUyBmZWVkcy4nLFxuICBzZWxlY3RvcjogJ1wiI2pzLWZlZWRcIihkZWZhdWx0KSBvciBvdGhlciBzdHJpbmcuIFRoZSBET00gZWxlbWVudCBzZWxlY3RvciBmb3IgeW91ciBmZWVkLiBUaGUgaW5uZXIgaHRtbCBvZiB0aGlzIGVsZW1lbnQgd2lsbCBiZSByZXBsYWNlZCB3aXRoIHRoZSBmZWVkLicsXG4gIHR5cGU6ICdcIm1lZGl1bVwiKGRlZmF1bHQpIG9yIG90aGVyIHN0cmluZy4gVGhlIGZlZWQgdHlwZS4gQ3VycmVudGx5LCBvbmx5IE1lZGl1bSBmZWVkcyBhcmUgc3VwcG9ydGVkIHNvIHRoaXMgc2hvdWxkblxcJ3QgY2hhbmdlLicsXG4gIHRpdGxlOiAnVGhlIHRpdGxlIG9mIHRoZSBmZWVkIHRoYXQgYXBwZWFycyBpbiB0aGUgaGVhZGVyLiBCeSBkZWZhdWx0IHRoaXMgdXNlcyB0aGUgZmVlZFxcJ3MgdGl0bGUuIEhvd2V2ZXIsIGlmIHVzaW5nIGRpc3BsYXlpbmcgbXVsdGlwbGUgZmllbGRzIHRoaXMgc2hvdWxkIGJlIHNldC4gT3RoZXJ3aXNlLCBpdCB3aWxsIHVzZSB0aGUgbGFzdCBmZWVkIHRpdGxlIHRoYXQgd2FzIGxvYWRlZC4nLFxuICB0aXRsZVVybDogJ1RoZSB1cmwgdGhhdCB0aGUgdGl0bGUgbGlua3MgdG8uIEJ5IGRlZmF1bHQgdGhpcyB1c2VzIHRoZSBmZWVkXFwncyB1cmwuIEhvd2V2ZXIsIGlmIHVzaW5nIGRpc3BsYXlpbmcgbXVsdGlwbGUgZmllbGRzIHRoaXMgc2hvdWxkIGJlIHNldC4gT3RoZXJ3aXNlLCBpdCB3aWxsIHVzZSB0aGUgbGFzdCBmZWVkIHVybCB0aGF0IHdhcyBsb2FkZWQuJyxcbiAgcHJvZmlsZUltZzogJ1RoZSB1cmwgdG8gdGhlIHByb2ZpbGUgaW1hZ2UuIEJ5IGRlZmF1bHQgdGhpcyB1c2VzIHRoZSBmZWVkXFwncyBwcm9maWxlIGltYWdlLiBIb3dldmVyLCBpZiB1c2luZyBkaXNwbGF5aW5nIG11bHRpcGxlIGZpZWxkcyB0aGlzIHNob3VsZCBiZSBzZXQuICBPdGhlcndpc2UsIGl0IHdpbGwgdXNlIHRoZSBsYXN0IGZlZWQgaW1hZ2UgdGhhdCB3YXMgbG9hZGVkLicsXG4gIGZvbnRTaXplOiAnQW55IHZhbGlkIGNzcyBmb250LXNpemUgdmFsdWUgYW5kIHVuaXQgKGVtLCBweCwgJSwgZXRjLikuIFNldCB0aGlzIHRvIGEgc21hbGxlciBwZXJjZW50YWdlIChzYXksIDg1JSkgdG8gbWFrZSB0aGUgZmVlZCBhcHBlYXIgbW9yZSBjb21wYWN0IGluIHNtYWxsZXIgY29sdW1ucycsXG4gIHJhdGlvUHJvZmlsZTogJ2FycmF5IG9mIHR3byBzdHJpbmdzLiBQaXhlbCBudW1iZXJzIHdpdGhvdXQgXCJweFwiIHVuaXQuIEltYWdlIHNvdXJjZSBhdHRyaWJ1dGUgd2lkdGggYW5kIGhlaWdodCBmb3IgdGhlIGFjY291bnQgYXZhdGFyLicsXG4gIHBvc3RCb3JkZXJDb2xvcjogJ0FueSB2YWxpZCBjc3MgYm9yZGVyLWNvbG9yIHZhbHVlLiBTZXQgdGhlIGNvbG9yIG9mIHRoZSBib3JkZXJzIGluIHRoZSBmZWVkLiBBbGwgb2YgdGhlIGNvbG9ycyBpbiB0aGUgZmVlZCB3aWxsIGluaGVyaXQgdGhlIHN0eWxlIG9mIHRoZSBwYWdlIGV4Y2VwdCBmb3IgdGhlIGJvcmRlcnMgYmV0d2VlbiBjYXJkcy4gVGhpcyBtYXkgYmUgYW55IHN0YW5kYXJkIENTUyBjb2xvciB2YXJpYWJsZS4nLFxuICBwb3N0SW1nSGVpZ2h0OiAnUGl4ZWwgdmFsdWUgd2l0aCBcInB4XCIgdW5pdC4gQ1NTIGhlaWdodCBvZiB0aGUgcG9zdCBpbWFnZS4gVGhlIHdpZHRoIG9mIHRoZSBpbWFnZSBkZWZhdWx0cyB0byAxMDAlIHRoZSB3aWR0aCBvZiB0aGUgcG9zdC4nLFxuICBwb3N0RXhjZXJwdExlbmd0aDogJ1RoaXMgaXMgdGhlIGxlbmd0aCBvZiB0aGUgZXhjZXJwdC4nLFxuICBwb3N0RXhjZXJwdFRyYWlsOiAnU2V0dGluZyB0aGlzIHdpbGwgb3ZlcnJpZGUgdGhlIHRyYWlsaW5nIGVsbGlwc2lzIGZvciBleGNlcnB0cy4nLFxuICBwb3N0Q3RhVGV4dDogJ1RoaXMgaXMgdGhlIHRleHQgZm9yIGVhY2ggcG9zdFxcJ3MgY2FsbCB0byBhY3Rpb24uJyxcbiAgcG9zdERhdGVMb2NhbDogJ1RoZSBkYXRlIGZvcm1hdHRpbmcgdXNlcyBEYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygpLiBUaGUgb3B0aW9ucyBpbiBwb3N0RGF0ZUxvY2FsIGFuZCBwb3N0RGF0ZUZvcm1hdCBhcmUgcGFzc2VkIGFzIERhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKHBvc3REYXRlTG9jYWwsIHBvc3REYXRlRm9ybWF0KS4gUmVmZXIgdG8gdGhlIGRvY3VtZW50YXRpb24gb24gRGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoKSBoZXJlOiBkZXZlbG9wZXIubW96aWxsYS5vcmcuJyxcbiAgcG9zdERhdGVGb3JtYXQ6ICdUaGlzIGlzIGEgcGFyYW1ldGVyIHVzZWQgYnkgRGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoKSwgUmVmZXIgdG8gdGhlIGRvY3VtZW50YXRpb24gYWJvdmUgZm9yIGNvbmZpZ3VyYXRpb24gZGV0YWlscy4nLFxuICBwb3N0RGF0ZVRpdGxlOiAnVGhpcyBpcyB0aGUgdGl0bGUgc2V0IHRvIHRoZSBwdWJsaXNoZWQgZGF0ZSBlbGVtZW50IHRvIHByb3ZpZGUgY29udGV4dCBvbiBtb3VzZW92ZXIuJyxcbiAgY2xhc3Nlczoge1xuICAgIHdyYXBwZXI6ICdcIm8tZmVlZC0yY29sdW1uXCIgb3IgXCJvLWZlZWQtM2NvbHVtblwiIGFyZSBhdmFpbGFibGUgaW4gdGhlIGZlZWQgc3R5bGVzaGVldCB0byBjaGFuZ2UgdGhlIEZlZWQgaXRlbXMgbGF5b3V0IHRvIDIgb3IgMyBjb2x1bW5zLiBIb3dldmVyLCBhbnkgYWRkaXRpb25hbCBzdHJpbmcgY2FuIGJlIGlucHV0IGhlcmUgdG8gYWRkIGNsYXNzZXMgdG8gdG8gdGhlIHdpZGdldCB3cmFwcGVyLiBUaGlzIGFuZCBvdGhlciBjbGFzc2VzIGFyZSBhdmFpbGFibGUgZm9yIHRoZSBNZWRpdW0gdGVtcGxhdGUgb25seS4gSWYgeW91IGNyZWF0ZSB5b3VyIG93biB0ZW1wbGF0ZSB0aGVzZSB3aWxsIG5vdCBiZSBleHBvc2VkIHRvIHRoZW0gYXV0b21hdGljYWxseS4gU2VlIHRoZSBNZWRpdW0gdGVtcGxhdGUgZXhhbXBsZSB0byBzZWUgaG93IHRoZXkgYXJlIGFkZGVkLicsXG4gICAgaGVhZGVyOiAnQWRkcyBjbGFzc2VzIHRvIHRoZSB3aWRnZXQgaGVhZGVyIGFib3ZlIHRoZSBwb3N0IGxpc3QuJyxcbiAgICB1cmw6ICdBZGRzIGNsYXNzZXMgdG8gdG8gdGhlIGZlZWRzXFwncyB1cmwuJyxcbiAgICBmZWVkSXRlbTogJ0FkZHMgY2xhc3NlcyB0byB0byB0aGUgZmVlZHNcXCdzIHBvc3RzLicsXG4gICAgdGl0bGU6ICdBZGRzIGNsYXNzZXMgdG8gdG8gdGhlIHRpdGxlIG9mIGVhY2ggY2FyZC4nLFxuICAgIGxpbms6ICdBZGRzIGNsYXNzZXMgdG8gdG8gdGhlIGxpbmsgb2YgZWFjaCBjYXJkLicsXG4gICAgdGh1bWJuYWlsOiAnQWRkcyBjbGFzc2VzIHRvIHRvIHRoZSB0aHVtYm5haWwgaW1hZ2Ugb2YgZWFjaCBjYXJkLicsXG4gICAgZXhjZXJwdDogJ0FkZHMgY2xhc3NlcyB0byB0byB0aGUgZXhjZXJwdCBvZiBlYWNoIGNhcmQuJyxcbiAgICBpdGVtRm9vdGVyOiAnQWRkcyBjbGFzc2VzIHRvIHRvIHRoZSBmb290ZXIgb2YgZWFjaCBjYXJkIHdpdGggdGhlIGN0YSBhbmQgZGF0ZS4nLFxuICAgIGN0YTogJ0FkZHMgY2xhc3NlcyB0byB0byB0aGUgZmluYWwgY2FsbCB0byBhY3Rpb24gb2YgZWFjaCBjYXJkLicsXG4gICAgZGF0ZTogJ0FkZHMgY2xhc3NlcyB0byB0byB0aGUgcHVibGljYXRpb24gZGF0ZSBvZiBlYWNoIGNhcmQuJ1xuICB9LFxuICB0ZW1wbGF0ZXM6IHtcbiAgICBvcGVuZXI6ICdUaGUgb3BlbmluZyB0ZW1wbGF0ZSB0YWcgb3Igd3JhcHBlciBvZiB0aGUgZW50aXJlIGZlZWQuIEFkZCBibGFuayBzdHJpbmcgdG8gcmVtb3ZlIHRoZXNlIGNvbXBvbmVudC4gVGhpcyBpcyB3aGVyZSB5b3Ugd291bGQgaW5zZXJ0IGEgY3VzdG9tIExvRGFzaCB0ZW1wbGF0ZSBmb3IgdGhlIGZlZWQgdG8gcGFyc2UuJyxcbiAgICBoZWFkZXI6ICdUaGUgaGVhZGVyIHRlbXBsYXRlIHRoYXQgc2l0cyBhdCB0aGUgdG9wIG9mIHRoZSBwb3N0cy4nLFxuICAgIHBvc3RzOiAnVGhlIHBvc3RzIGxvb3AgaW5jbHVkaW5nIHRoZSBwb3N0cyB0ZW1wbGF0ZS4nLFxuICAgIGNsb3NlcjogJ1RoZSBjbG9zaW5nIHRlbXBsYXRlIHRhZyBvciB3cmFwcGVyIG9mIHRoZSBlbnRpcmUgZmVlZC4nXG4gIH0sXG4gIGxvZzogJ2ZhbHNlKGRlZmF1bHQpIG9yIHRydWUuIEVuYWJsZXMgbG9nZ2luZyBkYXRhIHRvIHRoZSBjb25zb2xlLiBZb3Ugd2lsbCB3YW50IHRoaXMgdHVybmVkIG9mZiBpbiBldmVyeSBjYXNlIHVubGVzcyB5b3UgYXJlIGNyZWF0aW5nIGEgdGVtcGxhdGUgYW5kIG5lZWQgdG8gc2VlIHRoZSBkYXRhIGJlaW5nIHBhc3NlZCB0byBpdC4nLFxuICB1bmlxdWU6ICdmYWxzZShkZWZhdWx0KSBvciB0cnVlLiBXaGVuIHVzaW5nIG11bHRpcGxlIGZlZWRzIHNvbWUgTWVkaXVtIGFydGljbGVzIGNhbiBiZSBkdXBsaWNhdGVkIGJldHdlZW4gcHVibGljYXRpb25zLiBJZiB5b3Ugd2FudCB1bmlxdWUgcG9zdHMgYnkgdGl0bGUgc3dpdGNoIHRoaXMgdG8gdHJ1ZS4gVGhlcmUgaXMgbm8gcHJpb3JpdGl6YXRpb24gb2Ygd2hpY2ggcG9zdCB3aWxsIHNob3cgdXAuJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRmVlZERvY3M7XG4iXSwibmFtZXMiOlsiRmVlZERvY3MiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoieUNBTU1BLEVBQ0osd0hBQ09DLFFBQVVELEVBQVNDLGdCQUk1QkQsRUFBU0MsY0FDRCw2TkFDSSxtSkFDSixnSUFDQyxpT0FDRyw4TUFDRSxzTkFDRiw2S0FDSSx5SUFDRyxnUEFDRiw2SUFDSSxzREFDRCw2RUFDTCxpRUFDRSxnUkFDQyxtSUFDRCx3R0FFSiwrYUFDRCw2REFDSCwrQ0FDSyw4Q0FDSCxrREFDRCxzREFDSywrREFDRiwwREFDRyx3RUFDUCxpRUFDQywyRUFHRSw0TEFDQSwrREFDRCxzREFDQywrREFFTCxrTUFDRyJ9