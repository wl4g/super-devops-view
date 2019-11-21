import fa from "element-ui/src/locale/lang/fa";

export default {
  name: 'manage-group',
  components: {  },
  data() {
    return {
      //tree-table 标题列数据
      columns: [
        {
          text: 'name',
          value: 'name',
        },
        {
          text: 'displayName',
          value: 'displayName',
        },
      ],
      //tree-table 行数据
      data: [],
      // 列表按钮配置
      btn_info: {
        width: 350,
        add_text: 'add lower level',
        update_text: 'edit',
        delete_text: 'del',
      },

      //form 属性
      saveForm: {
        id: '',
        name: '',
        displayName: '',
        parentId: '',
        type: '',
        menuIds: [],
        menuNameStrs: '',
        roleIds: [],
        groupExt:{
          id: '',
          displayName: '',
          contact: '',
          contactPhone: '',
          address: '',
        },
      },
      isEdit: false,

      //验证
      rules: {
        moduleName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        aliasName: [{ required: true, message: '请输入别名', trigger: 'blur' }],
        belongTo: [{required: true, message: '请选择所属系统', trigger: 'blur' }],
        moduleOrder: [{required: true, name:'排序', validator: this.$validate_isPositiveInteger, trigger: 'blur'}]
      },

      //弹窗控制
      dialogVisible: false,
      //用于锁定确认按钮，避免重复提交
      dialogSubmitBtnSwith: false,
      //窗口标题
      windowTitle: '',

      //rolesData
      rolesData:[],

      //menusData
      menuData:[],//tree
      menuDataList:[],//list
      treeShow: false,
      defaultProps: {
        children: 'children',
        label: 'displayName',
      },


    }
  },
  methods : {
    /**
     * 获取列表
     */
    onGetList() {
      this.$$api_iam_getGroupsTree({
        fn: data => {
          this.data = data.data.data;
        }
      })
    },

     /**
     * 点击删除按钮
     */
    onClickBtnDelete(opts) {
      this.$confirm('Be Careful！！！Children group will be del(Logical), and the relationship with user/role/menu will not be del', 'Yes？').then(() => {
        this.$$api_iam_delGroup({
          data: {id : opts.data.id},
          fn: data => {
            this.onGetList();
          }
        })
      })
    },
    /**
     * 添加下级菜单按钮
     */
    onClickBtnAdd(opts) {
      //refresh
      this.getRoles();
      this.getMenus();

      this.emptyFormFieldsAndEnableDialogSubmitBtn();
      this.windowTitle = '添加['+opts.data.displayName+']的下级菜单';
      this.dialogVisible = true;
      this.saveForm.parentId = opts.data.id;
      this.isEdit = false;
    },
    /**
     * 修改按钮
     */
    onClickBtnUpdate(opts) {
      //refresh
      this.getRoles();
      this.getMenus();

      this.emptyFormFieldsAndEnableDialogSubmitBtn();
      console.info(opts);
      this.windowTitle = '修改['+opts.data.displayName+']菜单';
      this.dialogVisible = true;
      this.isEdit = true;
      this.$$api_iam_groupDetail({
        data: {
          id: opts.data.id,
        },
        fn: data => {
          this.saveForm = data.data.data;
          if(this.$refs.modulesTree && this.saveForm.menuIds instanceof Array){
            this.$refs.modulesTree.setCheckedKeys(this.saveForm.menuIds);
            this.checkChange();
          }
        },
        errFn: () => {
          this.$message.error('get group fail');
          this.dialogVisible = false;
        }
      });
    },
    /**
     * 清空所有的绑定属性，用于切换form的时候
     */
    emptyFormFieldsAndEnableDialogSubmitBtn(){
      if(this.$refs['groupForm']) {
        this.$refs['groupForm'].resetFields();
      }
      this.isEdit = false;
      this.saveForm = {
        id: '',
        name: '',
        displayName: '',
        parentId: '',
        type: '',
        menuIds: [],
        menuNameStrs: '',
        roleIds: [],
        groupExt:{
          id: '',
          displayName: '',
          contact: '',
          contactPhone: '',
          address: '',
        },
      };
    },
    /**
     * 添加顶级菜单
     */
    addTopLevelModule(){
      //refresh
      this.getRoles();
      this.getMenus();

      this.emptyFormFieldsAndEnableDialogSubmitBtn();
      this.dialogVisible = true;
      this.windowTitle = '添加顶级菜单';
      this.saveForm.parentid = 0;
      this.isEdit = false;
    },
    /**
     * 添加或者保存
     */
    save(){
      this.$$api_iam_saveGroup({
        data: this.saveForm,
        fn: data => {
          this.$message({
            message: 'save success',
            type: 'success'
          });
          this.dialogVisible = false;
          this.onGetList();
        },
        errFn: () => {
          this.$message.error('save fail');
        }
      })
    },

    getRoles(){
      this.$$api_iam_getRoles({
        data: {

        },
        fn: data => {
          //this.loading = false;
          if (data.code == 200) {
            this.rolesData = data.data.data;
          } else {
            this.$alert(data.message, '错误', {
              confirmButtonText: '确定'
            });
          }
        },
        errFn: () => {
          //this.loading = false;
          this.$alert('访问失败，请稍后重试！', '错误', {
            confirmButtonText: '确定',
          });
        }
      })
    },

    getMenus(){
      this.$$api_iam_getMenuTree({
        data: {

        },
        fn: data => {
          //this.loading = false;
          if (data.code == 200) {
            this.menuData = data.data.data;
            this.menuDataList = data.data.data2;
          } else {
            this.$alert(data.message, '错误', {
              confirmButtonText: '确定'
            });
          }
        },
        errFn: () => {
          //this.loading = false;
          this.$alert('访问失败，请稍后重试！', '错误', {
            confirmButtonText: '确定',
          });
        }
      })
    },

    //模块权限树展示
    focusDo() {
      if(this.$refs.modulesTree && this.saveForm.menuIds instanceof Array) this.$refs.modulesTree.setCheckedKeys(this.saveForm.menuIds)
      this.treeShow = !this.treeShow;
      let _self = this;
      this.$$lib_$(document).bind("click",function(e){
        let target  = _self.$$lib_$(e.target);
        if(target.closest(".noHide").length == 0 && _self.treeShow){
          _self.treeShow = false;
        }
        e.stopPropagation();
      })
    },

    getChild(node,list){
      if(node&&node['children']){
        let children = node['children'];
        for(let i = 0; i<children.length;i++){
          list.push(children[i]['id']);
          this.getChild(children[i],list);
        }
      }
      return list;
    },

    //模块权限树选择
    checkChange(node, selfChecked, childChecked) {
      let checkedKeys = this.$refs.modulesTree.getCheckedKeys();
      if(selfChecked){
        let parentList = this.getParent(this.menuDataList, node.parentId, []);
        checkedKeys = checkedKeys.concat(parentList)
        this.$refs.modulesTree.setCheckedKeys(checkedKeys)
      }else{
        let childList = this.getChild( node, []);
        checkedKeys = checkedKeys.filter(v => {
          let flag = true;
          for (var i = 0; i < childList.length; i++) {
            if(v == childList[i]){
              flag = false
            }
          }
          return flag
        });
        this.$refs.modulesTree.setCheckedKeys(checkedKeys)

      }
      let checkedNodes = this.$refs.modulesTree.getCheckedNodes();
      let moduleNameList = [];
      checkedNodes.forEach(function(item){
        moduleNameList.push(item.displayName)
      });
      this.saveForm.menuIds = checkedKeys;
      console.info(this.saveForm.menuIds);
      this.$set(this.saveForm,'menuNameStrs',moduleNameList.join(','))
    },

    getParent(list, parentId, parentList) {
      if (parentId == '0') return;
      for (let i = 0; i < list.length; i++) {
        if (parentId == list[i].id) {
          parentList.push(list[i].id);
          this.getParent(list, list[i].parentId, parentList)
        }
      }
      return parentList
    },


  },
  mounted() {
    this.onGetList();
    this.getRoles();
    this.getMenus();
  },
  watch:{
  }
}