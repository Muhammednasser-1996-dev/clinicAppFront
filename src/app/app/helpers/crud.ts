import { Images } from '../../config/images';
import { Location } from '../models/location';
import { Model } from '../models/model';
import { Util } from '../util/util';
import { Message } from './message';
import { Sync } from './sync';
import { DexieModel } from '../models/dexieModel';
import { Auth } from '../models/auth';
export abstract class Crud {

  protected className: any = DexieModel;

  images: any = Images;
  list: any = [];
  actionBtns: any = [];
  selectedResource: any;
  selectedIndex: any;
  resource: any;
  enableSave: boolean = false;
  locations: any = [];
  filterData: any = {};
  maxCount: any = 1;
  usedCount = 0;
  resourceKey: any = "";

  constructor(private message: Message) {
    this.initResource();
    this.initList();
    this.initActionBtns();
    this.initLocations();
  }

  initMaxCount() {
    this.maxCount = Auth.modules()[this.resourceKey]?.resource_count ?? 1;
  }

  async initLocations() {
    this.locations = await Location.notDeleted();
  }

  initResource() {
    this.resource = new this.className;
    this.initList();
  }

  select(item: any, index: any) {
    this.selectedResource = item;
    this.selectedIndex = index;
    this.initActionBtns();
    this.enableSave = false;
  }

  observeChanges() {
    this.enableSave = true;
    this.initActionBtns();
  }

  create() {
    this.reset();
    this.initActionBtns();
  }

  edit() {
    this.resource = new this.className(this.selectedResource.getData());
  }

  reset() {
    this.resource = new this.className;
    this.selectedResource = null;
    this.selectedIndex = null;
  }

  remove() {
    var self = this;
    this.resource = new this.className(this.selectedResource.getData());
    this.message.confirm(Util.trans('Are you Sure'), async () => {
      self.resource.__deleted_at = Util.getCreatedAt();
      await self.resource.update({
        __deleted_at: Util.getCreatedAt()
      });
      await self.initList();
      self.reset();
      this.message.success(Util.trans('done'));
      Sync.getInstance().sync();
    });
  }

  async save() {
    if (!this.validate()) {
      return;
    }
    await this.resource.insertOrUpdate();

    this.reset();
    await this.initList();
    this.onAfterSave();
    this.message.success(Util.trans('done'));
    Sync.getInstance().sync();
  }

  async initList() {
    try {
      this.list = await this.className.notDeleted();
    } catch (error) { }
  }

  close() {

  }

  validate() {
    return false;
  }

  initActionBtns() {
    var self = this;
    this.actionBtns = [
      {
        icon: "app-i-plus",
        text: Util.trans('New'),
        show: true,
        enable: true,
        action: () => {
          this.create();
        },
      },
      {
        icon: "app-i-edit",
        text: Util.trans('Edit'),
        show: true,
        enable: this.selectedIndex != null,
        action: () => {
          this.edit();
        },
      },
      {
        icon: "app-i-trash",
        text: Util.trans('Remove'),
        show: true,
        enable: this.selectedIndex != null,
        action: () => {
          this.remove();
        },
      },
      {
        icon: "app-i-back",
        text: Util.trans('back'),
        show: true,
        bottom: true,
        enable: true,
        action: () => {
          this.close();
        },
      },
    ];
  }

  onAfterSave() {

  }

  filter() {

  }

}
