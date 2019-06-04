import myTable from "@/components/table";
import { pageSize } from "@/config/env";
export const table = {
    components: {
        myTable
    },
    data() {
        return {
            tableData: [],
            tableOptions: {
                loading: true
            },
            pagination: {
                currentPage: 1, //当前页
                count: 0, //总数
                pageSize
            }
        }
    },
    created() {
        this.initData();
    },
    methods: {
        async initData() {
            this.getList({
                page: this.pagination.currentPage,
                pageSize: this.pagination.pageSize
            });
        },
        search() {
            this.tableOptions.loading = true;
            //合并对象
            this.getList(Object.assign({
                page: this.pagination.currentPage,
                pageSize: this.pagination.pageSize
            }, this.searchCondition()));
        },
        searchCondition(){
            throw new Error ('component must implement searchCondition method')
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.pagination.currentPage = val;
            this.offset = (val - 1) * this.pagination.pageSize;
            console.log(`offset= ${this.offset} 条`);
            //合并对象
            this.getList(Object.assign({
                page: this.pagination.currentPage,
                pageSize: this.pagination.pageSize
            }, this.searchCondition()));
        },
        cleanTable() {
            this.tableOptions.loading = false;
            this.tableData = [];
        },
        requestList() {
            throw new Error ('component must implement requestList method')
        },
        async getList(options) {
            this.tableData = []
            try {
                this.tableOptions.loading = true;
                const res = await this.requestList(options);
                if (res.result == 200 && res.data.data) {
                    this.tableOptions.loading = false;
                    this.tableData = res.data.data;
                    this.pagination.count = res.data.count;
                } else {
                    this.cleanTable();
                }
            } catch (error) {
                this.$message.error("出错了哦！" + error.msg);
                this.tableOptions.loading = false;
            }
        }
    }
};

export const tableform = {
    data() {
        return {
            dialogFormVisible: false,
            dialogLoading: false,
            title: "",
            isAdd: true,
            tableIndex: null,
            offset: 0 //从第几个开始 暂时没用
        }
    },
    methods: {
        handeleAdd() {
            try {
                this.form = {};
                //如果有方法需要处理
                if (this.handleAddOperate) {
                    this.handleAddOperate()
                }
                this.title = (this.modelName) ? ("添加" + this.modelName) : "添加";
                this.dialogFormVisible = true;
            } catch (error) {
                this.$message.error("出错了哦！");
            }
        },
        handleEdit(index, row) {
            try {
                this.isAdd = false;
                this.form = Object.assign({}, row); //复制一个对象的意思，   就是生拷贝，我觉得适合弹窗传数据，也适合提交数据用
                if (this.handleEditOperate) {
                    this.handleEditOperate(index, row)
                }
                this.title = (this.modelName) ? ("编辑" + this.modelName) : "编辑";
                this.tableIndex = index;
                this.dialogFormVisible = true;
            } catch (error) {
                this.$message.error("出错了哦！");
            }
        },
        getRefsForm(){
            throw new Error ('component must implement getRefsForm method')
        },
        getTableData() {
            throw new Error ('component must implement getTableData method')
          },
        requestAdd(form) {
            throw new Error ('component must implement requestAdd method')
        },
        requestEdit(form) {
            throw new Error ('component must implement requestEdit method')
        },
        requestDelete(form) {
            throw new Error ('component must implement requestDelete method')
        },
        async add(form) {
            //这里必须要用 this.$refs.form
            this.getRefsForm().validate(async valid => {
                if (valid) {
                    try {
                        this.dialogLoading = true;
                        const response = await this.requestAdd(this.form);
                        this.dialogLoading = false;
                        if (response.result == 200) {
                            this.$message({
                                type: "success",
                                message: "添加成功!"
                            });
                            this.dialogFormVisible = false;
                            this.initData();
                        } else {
                            this.$message.error("出错了哦！");
                        }

                    } catch (error) {
                        this.dialogLoading = false;
                        this.$message.error("出错了哦！");
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },

        async save(form) {
            this.getRefsForm().validate(valid => {
                if (valid) {
                    this.$confirm("此操作将永久修改该数据, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(async () => {
                        this.dialogLoading = true;
                        const response = await this.requestEdit(this.form);
                        this.dialogLoading = false;
                        if (response.result == 200) {
                            this.$message({
                                type: "success",
                                message: "保存成功!"
                            });
                            this.dialogFormVisible = false;
                            this.getTableData().splice(this.tableIndex, 1, this.form);
                        } else {
                            this.$message.error("出错了哦！");
                        }
                    })
                        .catch((err) => {
                            console.log(err)
                            this.dialogLoading = false;
                            this.$message.error("出错了哦！");
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        async handleDelete() {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    this.dialogLoading = true;
                    const response = await this.requestDelete(this.form);
                    this.dialogLoading = false;
                    if (response.result == 200) {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        this.dialogFormVisible = false;
                        this.getTableData().splice(this.tableIndex, 1);
                    } else {
                        this.$message.error("出错了哦！");
                    }
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message.error("出错了哦！");
                });
        }
    }
}