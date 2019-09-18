import {transDate, getDay} from 'utils/'

export default {
    name: 'contact',
    data() {
        return {
            //查询条件
            searchParams: {
                name: '',
                email: '',
                phone: '',
            },

            //分页信息
            total: 0,
            pageNum: 1,
            pageSize: 10,

            //弹窗表单
            saveForm: {
                id: '',
                name: '',
                email: '',
                phone: '',
                dingtalk: '',
                wechat: '',
                twitter: '',
                facebook: '',
                emailEnable: '',
                phoneEnable: '',
                dingtalkEnable: '',
                wechatEnable: '',
                twitterEnable: '',
                facebookEnable: '',
                phoneTimeOfFreq: '',
                dingtalkTimeOfFreq: '',
                wechatTimeOfFreq: '',
                twitterTimeOfFreq: '',
                facebookTimeOfFreq: '',
                phoneNumOfFreq: '',
                dingtalkNumOfFreq: '',
                wechatNumOfFreq: '',
                twitterNumOfFreq: '',
                facebookNumOfFreq: '',
                groups: [],
            },

            contactGroupData: [],
            groupTotal: 0,
            groupPageNum: 1,
            groupPageSize: 10,

            dialogVisible: false,
            dialogTitle: '',
            dialogLoading: false,

            contactData: [],



            //group
            //查询条件
            searchGroupParams: {
                name: '',
            },

        }
    },

    mounted() {
        this.groupList();
        this.getData();
        this.getGroupData();

    },

    methods: {

        onSubmit() {
            //this.loading = true;
            this.getData();
        },

        currentChange(i) {
            //this.loading = true;
            this.pageNum = i;
            this.getData();
        },

        currentChangeGroup(i) {
            //this.loading = true;
            this.groupPageNum = i;
            this.getGroupData();
        },



        // 获取列表数据
        getData() {
            this.$$api_share_contactList({
                data: {
                    name: this.searchParams.name,
                    email: this.searchParams.email,
                    phone: this.searchParams.phone,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.total = data.data.page.total;
                        this.contactData = data.data.list;
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

        cleanSaveForm() {
            this.saveForm.id = '';
            this.saveForm.name = '';
            this.saveForm.email = '';
            this.saveForm.phone = '';
            this.saveForm.dingtalk = '';
            this.saveForm.wechat = '';
            this.saveForm.twitter = '';
            this.saveForm.facebook = '';
            this.saveForm.emailEnable = '';
            this.saveForm.phoneEnable = '';
            this.saveForm.dingtalkEnable = '';
            this.saveForm.wechatEnable = '';
            this.saveForm.twitterEnable = '';
            this.saveForm.facebookEnable = '';
            this.saveForm.phoneTimeOfFreq = '';
            this.saveForm.dingtalkTimeOfFreq = '';
            this.saveForm.wechatTimeOfFreq = '';
            this.saveForm.twitterTimeOfFreq = '';
            this.saveForm.facebookTimeOfFreq = '';
            this.saveForm.phoneNumOfFreq = '';
            this.saveForm.dingtalkNumOfFreq = '';
            this.saveForm.wechatNumOfFreq = '';
            this.saveForm.twitterNumOfFreq = '';
            this.saveForm.facebookNumOfFreq = '';
            this.saveForm.groups = [];
        },
        addContact() {
            this.cleanSaveForm();
            this.dialogVisible = true;
            this.dialogTitle = 'Add notification contacts';
        },
        // 获取列表数据
        groupList() {
            this.$$api_share_groupList({
                data: {

                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.contactGroupData = data.data.list;
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

        saveContact() {
            this.$refs['saveForm'].validate((valid) => {
                if (valid) {
                    //this.dialogLoading = true;
                    this.$$api_share_saveContact({
                        data: {
                            id: this.saveForm.id,
                            name: this.saveForm.name,
                            email: this.saveForm.email,
                            phone: this.saveForm.phone,
                            dingtalk: this.saveForm.dingtalk,
                            wechat: this.saveForm.wechat,
                            twitter: this.saveForm.twitter,
                            facebook: this.saveForm.facebook,
                            emailEnable: this.saveForm.emailEnable,
                            phoneEnable: this.saveForm.phoneEnable,
                            dingtalkEnable: this.saveForm.dingtalkEnable,
                            wechatEnable: this.saveForm.wechatEnable,
                            twitterEnable: this.saveForm.twitterEnable,
                            facebookEnable: this.saveForm.facebookEnable,
                            phoneTimeOfFreq: this.saveForm.phoneTimeOfFreq,
                            dingtalkTimeOfFreq: this.saveForm.dingtalkTimeOfFreq,
                            wechatTimeOfFreq: this.saveForm.wechatTimeOfFreq,
                            twitterTimeOfFreq: this.saveForm.twitterTimeOfFreq,
                            facebookTimeOfFreq: this.saveForm.facebookTimeOfFreq,
                            phoneNumOfFreq: this.saveForm.phoneNumOfFreq,
                            dingtalkNumOfFreq: this.saveForm.dingtalkNumOfFreq,
                            wechatNumOfFreq: this.saveForm.wechatNumOfFreq,
                            twitterNumOfFreq: this.saveForm.twitterNumOfFreq,
                            facebookNumOfFreq: this.saveForm.facebookNumOfFreq,
                            groups: this.saveForm.groups,
                        },
                        fn: data => {
                            this.dialogLoading = false;
                            if (data.code == 200) {
                                this.dialogVisible = false;
                                this.getData();
                                this.cleanSaveForm();
                            } else {
                                this.$alert(data.message, '错误', {
                                    confirmButtonText: '确定'
                                });
                            }
                        },
                        errFn: () => {
                            this.dialogLoading = false;
                            this.$alert('访问失败，请稍后重试！', '错误', {
                                confirmButtonText: '确定',
                            });
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        editContact(row) {
            if (!row.id) {
                return;
            }
            this.$$api_share_contactDetail({
                data: {
                    id: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.saveForm = data.data.contact;
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

            this.dialogVisible = true;
            this.dialogTitle = '编辑';
        },


        delContact(row) {
            if (!row.id) {
                return;
            }
            this.$$api_share_delContact({
                data: {
                    id: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getData();
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


//=============================group=============================
        getGroupData() {
            this.$$api_share_contactGroupList({
                data: {
                    name: this.searchGroupParams.name,
                    pageNum: this.groupPageNum,
                    pageSize: this.groupPageSize,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.groupTotal = data.data.page.total;
                        this.contactGroupData = data.data.list;
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

        saveGroup(row) {
            if(!row){
                return;
            }
            this.$$api_share_saveContactGroup({
                data: {
                    id: row.id,
                    name: row.name,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.getGroupData();
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

        addGroup(){
            this.contactGroupData.push({
                id: '',
                name: '',
            })
        },

        delContactGroup(row) {
            if(!row){
                return;
            }
            this.$$api_share_delContactGroup({
                data: {
                    id: row.id,
                },
                fn: data => {
                    //this.loading = false;
                    if (data.code == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getGroupData();
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



    }
}