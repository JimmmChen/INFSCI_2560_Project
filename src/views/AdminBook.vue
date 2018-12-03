<template>
  <div>
    <admin-header></admin-header>
    <div class="container-fluid">
      <div class="row">
        <admin-sidebar></admin-sidebar>
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-2 order-md-1 mb-4"></div>
            <div class="col-md-10 order-md-2">
              <form action="/admin/book" method="post" enctype="multipart/form-data">
                <ul class="form-style-1">
                    <li>
                        <label>Book ID<span class="required">*</span></label>
                        <input type="text" name="id" required="required" class="field-divided"/>
                    </li>
                    <li>
                        <label>Title<span class="required">*</span></label>
                        <input type="text" name="title" required="required" class="field-long"/>
                    </li>
                    <li>
                        <label>Price<span class="required">*</span></label>
                        <input type="number" step="0.01" name="price" required="required" class="field-long"/>
                    </li>
                    <li>
                        <label>Product Url<span class="required">*</span></label>
                        <input type="url" name="url" required="required" class="field-long"/>
                    </li>
                    <li>
                        <label>Publish Date<span class="required">*</span></label>
                        <input type="number" name="date" required="required" class="field-long"/>
                    </li>
                    <li>
                        <label>Category</label>
                        <select name="category" class="field-select">
                        <option value="Literature&Fiction">Literature&amp;Fiction</option>
                        <option value="History">History</option>
                        <option value="Business&Money">Business&amp;Money</option>
                        <option value="Computers&Technology">Computers&amp;Technology</option>
                        <option value="Philosophy">Philosophy</option>
                        <option value="Health,Fitness&Dieting">Health,Fitness&amp;Dieting</option>
                        <option value="Sexual Health">Sexual Health</option>
                        <option value="Humor&Entertainment">Humor&amp;Entertainment</option>
                        <option value="Cookbooks,Food&Wine">Cookbooks,Food&amp;Wine</option>
                        </select>
                    </li>
                    <li>
                        <label>Cover Image<span class="required">*</span></label>
                        <input type="file" accept="image/png, image/jpeg" name="cover" required="required" class="field-long"/>
                    </li>
                    <li>
                        <input type="submit" />
                    </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from '@/components/AdminHeader'
import AdminSidebar from '@/components/AdminSidebar'

export default{
  data () {
    return {
    }
  },
  components: {
    AdminHeader,
    AdminSidebar
  }
}
</script>

<style scoped>
@import "../assets/css/bootstrap.min.css";
.form-style-1 {
  margin:10px auto;
  max-width: 400px;
  padding: 20px 12px 10px 20px;
  font: 13px "Lucida Sans Unicode", "Lucida Grande", sans-serif;
}
.form-style-1 li {
  padding: 0;
  display: block;
  list-style: none;
  margin: 10px 0 0 0;
}
.form-style-1 label{
  margin:0 0 3px 0;
  padding:0px;
  display:block;
  font-weight: bold;
}
.form-style-1 input[type=text],
.form-style-1 input[type=date],
.form-style-1 input[type=datetime],
.form-style-1 input[type=number],
.form-style-1 input[type=search],
.form-style-1 input[type=time],
.form-style-1 input[type=url],
.form-style-1 input[type=email],
textarea,
select{
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  border:1px solid #BEBEBE;
  padding: 7px;
  margin:0px;
  -webkit-transition: all 0.30s ease-in-out;
  -moz-transition: all 0.30s ease-in-out;
  -ms-transition: all 0.30s ease-in-out;
  -o-transition: all 0.30s ease-in-out;
  transition: all 0.30s ease-in-out;
  outline: none;
  }
.form-style-1 input[type=text]:focus,
.form-style-1 input[type=date]:focus,
.form-style-1 input[type=datetime]:focus,
.form-style-1 input[type=number]:focus,
.form-style-1 input[type=search]:focus,
.form-style-1 input[type=time]:focus,
.form-style-1 input[type=url]:focus,
.form-style-1 input[type=email]:focus,
.form-style-1 textarea:focus
.form-style-1 select:focus{
  -moz-box-shadow: 0 0 8px #88D5E9;
  -webkit-box-shadow: 0 0 8px #88D5E9;
  box-shadow: 0 0 8px #88D5E9;
  border: 1px solid #88D5E9;
}
.form-style-1 .field-divided{
  width: 49%;
}

.form-style-1 .field-long{
  width: 100%;
}
.form-style-1 .field-select{
  width: 100%;
}
.form-style-1 .field-textarea{
  height: 100px;
}
.form-style-1 input[type=submit], .form-style-1 input[type=button]{
  background: #4B99AD;
  padding: 8px 15px 8px 15px;
  border: none;
  color: #fff;
}
.form-style-1 input[type=submit]:hover, .form-style-1 input[type=button]:hover{
  background: #4691A4;
  box-shadow:none;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
}
.form-style-1 .required{
  color: red;
}
</style>
