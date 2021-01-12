Sign-up Forms can be hosted on Mailchimp using the [Form Builder](https://mailchimp.com/help/how-the-form-builder-works/). By default, these forms will be styled in the brand of Mailchimp but they can be customized using NYCO Patterns values. Additionally, typography and buttons can be customize by importing a stylesheet via the CDN.

### Form Builder

Below are the suggested base settings for the [Form Builder](https://mailchimp.com/help/how-the-form-builder-works/) design. To access the design panel, navigate to the Form Builder under **Audience** > **View Contacts** > **Signup Forms** > **Form Builder** > **Design it!**.

#### Page

Setting                        | Value
-------------------------------|-
**Background** > Background    | `#031553` (Navy)
**Header** > Font Size         | `28px`
**Header** > Line Height       | `Slight`
**Header** > Margin Bottom     | `30px`
**Header** > Margin Top        | `0`
**Outer Wrapper** > Background | `none`

#### Body

Setting                        | Value
-------------------------------|-
**Foreground** > Background    | `#FFFFFF` (Base White)
**Default Text** > Line-height | `1 1/2 Spacing`
**Default Text** > Font-Family | `Trebuchet MS`
**Default Text** > Font Size   | `16px`
**Default Text** > Text Color  | `#333333`
**Default Text** > Padding     | `40px`
**Link Style** > Text Color    | `#3155A6`

#### Forms

Setting                          | Value
---------------------------------|-
**Buttons** > Background         | `#1642DF` (Blue)
**Buttons** > Text Color         | `#FFFFFF` (Base White)
**Buttons Hovered** > Background | `#1642DF` (Blue)
**Buttons Hovered** > Text Color | `#FFFFFF` (Base White)
**Field Labels** > Line Height   | `1 1/2 Spacing`
**Field Labels** > Font-Family   | `Trebuchet MS`
**Field Labels** > Font Size     | `16px`
**Field Labels** > Text Color    | `#5D5D5D`
**Field Text** > Font-Family     | `Trebuchet MS`
**Field Text** > Text Color      | `#5D5D5D`
**Required** > Text Color        | `#FC5D52` (Primary Red)
**Required** > Visibility        | `Hide`
**Required Legend** > Display    | `Hide`
**Help Text** > Text Color       | `#777777`
**Errors** > Text Color          | `#FC5D52` (Primary Red)
**Errors** > Font Weight         | `Normal`

#### Advanced

Additional styles and fonts can be imported from the pattern cdn using the method described below.

1. Hover over the heading of the form, you should see the option to **edit**, **remove**, **use image**. Click **edit**. The dialogue for "Edit Your Content" will appear.

1. Click the **Edit Source** icon `<>` in the WYSIWYG editor.

1. Add a `<style>` tag that imports the Mailchimp stylesheet via the CDN.

Below is the sample snippet. Be sure to replace `{{ version }}` with the version number in the top right corner of this screen.

    <style type="text/css">@import url("https://cdn.jsdelivr.net/gh/CityOfNewYork/nyco-patterns@v{{ version }}/dist/objects/mailchimp/mailchimp.css");</style>
