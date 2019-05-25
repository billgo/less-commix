import './index.less';

export default {
<% for (var i = 0; i < vars.length; i++) {%>  "<%= vars[i].key %>": "<%- vars[i].value %>",
<% } %>};
