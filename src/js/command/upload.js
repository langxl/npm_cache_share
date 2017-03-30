/**
* @Author: wyw.wang <wyw>
* @Date:   2017-02-08 16:17
* @Email:  wyw.wang@qunar.com
* @Last modified by:   robin
* @Last modified time: 2017-02-28 16:19
*/
var _ = require('lodash'),
    Path = require('path'),
    swiftUtils = require('../common/swiftUtils');

var __cwd = process.cwd();
/*@Command({
    "name": "upload [path] [name]",
    "alias":"u",
    "des":"Upload a static source to repository, you can set the swift setting by parameters or use command 'ncs config set resourceSwift host|user|pass|container'",
    options:[
        ["-h, --host [host]", "host of swift"],
        ["-u, --user [user]", "user of swift"],
        ["-p, --pass [pass]", "pass of swift"],
        ["-c, --container [container]", "container in swift"],
        ["-z, --compressType [compressType]", "compress type, it is tar or zip, default is tar", "tar"]
    ]
})*/
module.exports = {
    run: function(path, name, options){
        try{
            var params = _.extend({}, swiftUtils.getConfig(options, 'resourceSwift'), {
                name: name,
                path: swiftUtils.check(path),
                compressType: options.compressType,
                destpath: Path.relative(process.cwd(), path)
            });
            swiftUtils.upload(params, this.exit);
        }catch(err){
            if(err){
                console.error(err.stack || err);
            }
            this.exit(err);
        }
    },
    /**
     * 退出
     * @return {[type]} [description]
     */
    exit: function(err){
        if(err){
            process.exit(1);
        } else {
            process.exit(0);
        }
    }
};
