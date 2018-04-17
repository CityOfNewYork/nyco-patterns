var FeedDocs=function(){"use strict";var e=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.default=e.default};return e.default={feed:"Required. This may either be one RSS feed or an array of feeds. Arrays of feeds will be combined and posts will be ordered by date. Currently, this only works with Medium RSS feeds.",selector:"The DOM element selector for your feed. The inner html of this element will be replaced with the feed.",type:"The feed type. Currently, only Medium feeds are supported so this shouldn't change.",title:"The title of the feed that appears in the header. By default this uses the feed's title. However, if using displaying multiple fields this should be set. Otherwise, it will use the last feed title that was loaded.",profileImg:"The url to the profile image. By default this uses the feed's profile image. However, if using displaying multiple fields this should be set.  Otherwise, it will use the last feed image that was loaded.",fontSize:"Set this to a smaller percentage (say, 85%) to make the feed appear more compact in smaller columns",ratioProfile:"Image source attribute width and height for the account avatar.",postBorderColor:"Set the color of the borders in the feed. All of the colors in the feed will inherit the style of the page except for the borders between cards. This may be any standard CSS color variable.",postImgHeight:"CSS height of the post image. The width of the image defaults to 100% the width of the post.",postExcerptLength:"This is the length of the excerpt.",postExcerptTrail:"This is the trailing ellipsis for excerpts.",postCtaText:"This is the text for each post's call to action.",postDateLocal:"The date formatting uses Date.toLocaleDateString(). The options in postDateLocal and postDateFormat are passed as Date.toLocaleDateString(postDateLocal, postDateFormat). Refer to the documentation on Date.toLocaleDateString() here: developer.mozilla.org.",postDateFormat:"This is a parameter used by Date.toLocaleDateString(), Refer to the documentation above for configuration details.",postDateTitle:"This is the title set to the published date element to provide context on mouseover.",classes:{wrapper:'Adds classes to to the wrapper for the whole widget. There are two classes that are available to change the Feed items layout to 2 or 3 columns: "o-feed-2column" or "o-feed-3column".',header:"Adds classes to the widget header above the post list.",url:"Adds classes to to the feeds's url.",feedItem:"Adds classes to to the feeds's posts.",title:"Adds classes to to the title of each card.",link:"Adds classes to to the link of each card.",thumbnail:"Adds classes to to the thumbnail image of each card.",excerpt:"Adds classes to to the excerpt of each card.",itemFooter:"Adds classes to to the footer of each card with the cta and date.",cta:"Adds classes to to the final call to action of each card.",date:"Adds classes to to the publication date of each card."},templates:{opener:"The opening template tag or wrapper of the entire feed.",header:"The header template that sits at the top of the posts.",posts:"The posts loop including the posts template.",closer:"The closing template tag or wrapper of the entire feed."},log:"Logs data to the console. You will want this turned off every case unless you are creating a template and need to see the data being passed to it."},e}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmVlZERvY3MuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vYmplY3RzL2ZlZWQvRmVlZERvY3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERlcGVuZGVuY2llc1xuICovXG5cbmNsYXNzIEZlZWREb2NzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kZWZhdWx0ID0gRmVlZERvY3MuZGVmYXVsdDtcbiAgfVxufVxuXG5GZWVkRG9jcy5kZWZhdWx0ID0ge1xuICBmZWVkOiAnUmVxdWlyZWQuIFRoaXMgbWF5IGVpdGhlciBiZSBvbmUgUlNTIGZlZWQgb3IgYW4gYXJyYXkgb2YgZmVlZHMuIEFycmF5cyBvZiBmZWVkcyB3aWxsIGJlIGNvbWJpbmVkIGFuZCBwb3N0cyB3aWxsIGJlIG9yZGVyZWQgYnkgZGF0ZS4gQ3VycmVudGx5LCB0aGlzIG9ubHkgd29ya3Mgd2l0aCBNZWRpdW0gUlNTIGZlZWRzLicsXG4gIHNlbGVjdG9yOiAnVGhlIERPTSBlbGVtZW50IHNlbGVjdG9yIGZvciB5b3VyIGZlZWQuIFRoZSBpbm5lciBodG1sIG9mIHRoaXMgZWxlbWVudCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggdGhlIGZlZWQuJyxcbiAgdHlwZTogJ1RoZSBmZWVkIHR5cGUuIEN1cnJlbnRseSwgb25seSBNZWRpdW0gZmVlZHMgYXJlIHN1cHBvcnRlZCBzbyB0aGlzIHNob3VsZG5cXCd0IGNoYW5nZS4nLFxuICB0aXRsZTogJ1RoZSB0aXRsZSBvZiB0aGUgZmVlZCB0aGF0IGFwcGVhcnMgaW4gdGhlIGhlYWRlci4gQnkgZGVmYXVsdCB0aGlzIHVzZXMgdGhlIGZlZWRcXCdzIHRpdGxlLiBIb3dldmVyLCBpZiB1c2luZyBkaXNwbGF5aW5nIG11bHRpcGxlIGZpZWxkcyB0aGlzIHNob3VsZCBiZSBzZXQuIE90aGVyd2lzZSwgaXQgd2lsbCB1c2UgdGhlIGxhc3QgZmVlZCB0aXRsZSB0aGF0IHdhcyBsb2FkZWQuJyxcbiAgcHJvZmlsZUltZzogJ1RoZSB1cmwgdG8gdGhlIHByb2ZpbGUgaW1hZ2UuIEJ5IGRlZmF1bHQgdGhpcyB1c2VzIHRoZSBmZWVkXFwncyBwcm9maWxlIGltYWdlLiBIb3dldmVyLCBpZiB1c2luZyBkaXNwbGF5aW5nIG11bHRpcGxlIGZpZWxkcyB0aGlzIHNob3VsZCBiZSBzZXQuICBPdGhlcndpc2UsIGl0IHdpbGwgdXNlIHRoZSBsYXN0IGZlZWQgaW1hZ2UgdGhhdCB3YXMgbG9hZGVkLicsXG4gIGZvbnRTaXplOiAnU2V0IHRoaXMgdG8gYSBzbWFsbGVyIHBlcmNlbnRhZ2UgKHNheSwgODUlKSB0byBtYWtlIHRoZSBmZWVkIGFwcGVhciBtb3JlIGNvbXBhY3QgaW4gc21hbGxlciBjb2x1bW5zJyxcbiAgcmF0aW9Qcm9maWxlOiAnSW1hZ2Ugc291cmNlIGF0dHJpYnV0ZSB3aWR0aCBhbmQgaGVpZ2h0IGZvciB0aGUgYWNjb3VudCBhdmF0YXIuJyxcbiAgcG9zdEJvcmRlckNvbG9yOiAnU2V0IHRoZSBjb2xvciBvZiB0aGUgYm9yZGVycyBpbiB0aGUgZmVlZC4gQWxsIG9mIHRoZSBjb2xvcnMgaW4gdGhlIGZlZWQgd2lsbCBpbmhlcml0IHRoZSBzdHlsZSBvZiB0aGUgcGFnZSBleGNlcHQgZm9yIHRoZSBib3JkZXJzIGJldHdlZW4gY2FyZHMuIFRoaXMgbWF5IGJlIGFueSBzdGFuZGFyZCBDU1MgY29sb3IgdmFyaWFibGUuJyxcbiAgcG9zdEltZ0hlaWdodDogJ0NTUyBoZWlnaHQgb2YgdGhlIHBvc3QgaW1hZ2UuIFRoZSB3aWR0aCBvZiB0aGUgaW1hZ2UgZGVmYXVsdHMgdG8gMTAwJSB0aGUgd2lkdGggb2YgdGhlIHBvc3QuJyxcbiAgcG9zdEV4Y2VycHRMZW5ndGg6ICdUaGlzIGlzIHRoZSBsZW5ndGggb2YgdGhlIGV4Y2VycHQuJyxcbiAgcG9zdEV4Y2VycHRUcmFpbDogJ1RoaXMgaXMgdGhlIHRyYWlsaW5nIGVsbGlwc2lzIGZvciBleGNlcnB0cy4nLFxuICBwb3N0Q3RhVGV4dDogJ1RoaXMgaXMgdGhlIHRleHQgZm9yIGVhY2ggcG9zdFxcJ3MgY2FsbCB0byBhY3Rpb24uJyxcbiAgcG9zdERhdGVMb2NhbDogJ1RoZSBkYXRlIGZvcm1hdHRpbmcgdXNlcyBEYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygpLiBUaGUgb3B0aW9ucyBpbiBwb3N0RGF0ZUxvY2FsIGFuZCBwb3N0RGF0ZUZvcm1hdCBhcmUgcGFzc2VkIGFzIERhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKHBvc3REYXRlTG9jYWwsIHBvc3REYXRlRm9ybWF0KS4gUmVmZXIgdG8gdGhlIGRvY3VtZW50YXRpb24gb24gRGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoKSBoZXJlOiBkZXZlbG9wZXIubW96aWxsYS5vcmcuJyxcbiAgcG9zdERhdGVGb3JtYXQ6ICdUaGlzIGlzIGEgcGFyYW1ldGVyIHVzZWQgYnkgRGF0ZS50b0xvY2FsZURhdGVTdHJpbmcoKSwgUmVmZXIgdG8gdGhlIGRvY3VtZW50YXRpb24gYWJvdmUgZm9yIGNvbmZpZ3VyYXRpb24gZGV0YWlscy4nLFxuICBwb3N0RGF0ZVRpdGxlOiAnVGhpcyBpcyB0aGUgdGl0bGUgc2V0IHRvIHRoZSBwdWJsaXNoZWQgZGF0ZSBlbGVtZW50IHRvIHByb3ZpZGUgY29udGV4dCBvbiBtb3VzZW92ZXIuJyxcbiAgY2xhc3Nlczoge1xuICAgIHdyYXBwZXI6ICdBZGRzIGNsYXNzZXMgdG8gdG8gdGhlIHdyYXBwZXIgZm9yIHRoZSB3aG9sZSB3aWRnZXQuIFRoZXJlIGFyZSB0d28gY2xhc3NlcyB0aGF0IGFyZSBhdmFpbGFibGUgdG8gY2hhbmdlIHRoZSBGZWVkIGl0ZW1zIGxheW91dCB0byAyIG9yIDMgY29sdW1uczogXCJvLWZlZWQtMmNvbHVtblwiIG9yIFwiby1mZWVkLTNjb2x1bW5cIi4nLFxuICAgIGhlYWRlcjogJ0FkZHMgY2xhc3NlcyB0byB0aGUgd2lkZ2V0IGhlYWRlciBhYm92ZSB0aGUgcG9zdCBsaXN0LicsXG4gICAgdXJsOiAnQWRkcyBjbGFzc2VzIHRvIHRvIHRoZSBmZWVkc1xcJ3MgdXJsLicsXG4gICAgZmVlZEl0ZW06ICdBZGRzIGNsYXNzZXMgdG8gdG8gdGhlIGZlZWRzXFwncyBwb3N0cy4nLFxuICAgIHRpdGxlOiAnQWRkcyBjbGFzc2VzIHRvIHRvIHRoZSB0aXRsZSBvZiBlYWNoIGNhcmQuJyxcbiAgICBsaW5rOiAnQWRkcyBjbGFzc2VzIHRvIHRvIHRoZSBsaW5rIG9mIGVhY2ggY2FyZC4nLFxuICAgIHRodW1ibmFpbDogJ0FkZHMgY2xhc3NlcyB0byB0byB0aGUgdGh1bWJuYWlsIGltYWdlIG9mIGVhY2ggY2FyZC4nLFxuICAgIGV4Y2VycHQ6ICdBZGRzIGNsYXNzZXMgdG8gdG8gdGhlIGV4Y2VycHQgb2YgZWFjaCBjYXJkLicsXG4gICAgaXRlbUZvb3RlcjogJ0FkZHMgY2xhc3NlcyB0byB0byB0aGUgZm9vdGVyIG9mIGVhY2ggY2FyZCB3aXRoIHRoZSBjdGEgYW5kIGRhdGUuJyxcbiAgICBjdGE6ICdBZGRzIGNsYXNzZXMgdG8gdG8gdGhlIGZpbmFsIGNhbGwgdG8gYWN0aW9uIG9mIGVhY2ggY2FyZC4nLFxuICAgIGRhdGU6ICdBZGRzIGNsYXNzZXMgdG8gdG8gdGhlIHB1YmxpY2F0aW9uIGRhdGUgb2YgZWFjaCBjYXJkLidcbiAgfSxcbiAgdGVtcGxhdGVzOiB7XG4gICAgb3BlbmVyOiAnVGhlIG9wZW5pbmcgdGVtcGxhdGUgdGFnIG9yIHdyYXBwZXIgb2YgdGhlIGVudGlyZSBmZWVkLicsXG4gICAgaGVhZGVyOiAnVGhlIGhlYWRlciB0ZW1wbGF0ZSB0aGF0IHNpdHMgYXQgdGhlIHRvcCBvZiB0aGUgcG9zdHMuJyxcbiAgICBwb3N0czogJ1RoZSBwb3N0cyBsb29wIGluY2x1ZGluZyB0aGUgcG9zdHMgdGVtcGxhdGUuJyxcbiAgICBjbG9zZXI6ICdUaGUgY2xvc2luZyB0ZW1wbGF0ZSB0YWcgb3Igd3JhcHBlciBvZiB0aGUgZW50aXJlIGZlZWQuJ1xuICB9LFxuICBsb2c6ICdMb2dzIGRhdGEgdG8gdGhlIGNvbnNvbGUuIFlvdSB3aWxsIHdhbnQgdGhpcyB0dXJuZWQgb2ZmIGV2ZXJ5IGNhc2UgdW5sZXNzIHlvdSBhcmUgY3JlYXRpbmcgYSB0ZW1wbGF0ZSBhbmQgbmVlZCB0byBzZWUgdGhlIGRhdGEgYmVpbmcgcGFzc2VkIHRvIGl0Lidcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZlZWREb2NzO1xuIl0sIm5hbWVzIjpbIkZlZWREb2NzIiwiZGVmYXVsdCJdLCJtYXBwaW5ncyI6InlDQU1NQSxFQUNKLHdIQUNPQyxRQUFVRCxFQUFTQyxnQkFJNUJELEVBQVNDLGNBQ0QsaU1BQ0ksOEdBQ0osNEZBQ0MsbU9BQ0ssc05BQ0YsbUhBQ0ksa0ZBQ0csOE1BQ0YsaUhBQ0ksc0RBQ0QsMERBQ0wsaUVBQ0UsZ1JBQ0MsbUlBQ0Qsd0dBRUosZ01BQ0QsNkRBQ0gsK0NBQ0ssOENBQ0gsa0RBQ0Qsc0RBQ0ssK0RBQ0YsMERBQ0csd0VBQ1AsaUVBQ0MsMkVBR0UsaUVBQ0EsK0RBQ0Qsc0RBQ0MsK0RBRUwifQ==
