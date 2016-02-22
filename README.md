# AngularTreeView
Angular TreeViewNode With Checkbox 
#Installation
Copy the script into your project and add a script and link tag to your page.
Add a dependency to your application module.
```
<pre>angular.module('myApp', ['treeView']);</pre>
```

#Usage
Attributes of angular treeview are below.
<ul>
  <li>data:If Your Data is static set your data in data Attribute</li>
  <li>fetch-url:If Your Data Load From other url set url in fetch-url Attribute</li>
  <li>fetch-type:set Type url get or post</li>
  <li>my-selection:set Init Select Items</li>
</ul>

#Here is a simple example.
#Url And get Type
```
<pre><tree-view
            fetch-url="/data/lst"
            fetch-type="get"
            ng-model="selectItems"
            my-selection='[{"id":158,"name":"items","children":[]}]'
        ></pre>
</tree-view>
```
#LocalDate:
```
<pre><tree-view
            data="[[lstItems]]"
            ng-model="selectItems"
            my-selection='[{"id":158,"name":"items","children":[]}]'
        >
</tree-view></pre>
```
