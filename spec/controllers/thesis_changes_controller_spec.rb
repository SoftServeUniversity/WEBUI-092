require 'spec_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to specify the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator.  If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails.  There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.
#
# Compared to earlier versions of this generator, there is very limited use of
# stubs and message expectations in this spec.  Stubs are only used when there
# is no simpler way to get a handle on the object needed for the example.
# Message expectations are only used when there is no simpler way to specify
# that an instance is receiving a specific message.

describe ThesisChangesController do

  # This should return the minimal set of attributes required to create a valid
  # ThesisChange. As you add validations to ThesisChange, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) { { "type_of_entity" => "MyString" } }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # ThesisChangesController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "GET index" do
    it "assigns all thesis_changes as @thesis_changes" do
      thesis_change = ThesisChange.create! valid_attributes
      get :index, {}, valid_session
      assigns(:thesis_changes).should eq([thesis_change])
    end
  end

  describe "GET show" do
    it "assigns the requested thesis_change as @thesis_change" do
      thesis_change = ThesisChange.create! valid_attributes
      get :show, {:id => thesis_change.to_param}, valid_session
      assigns(:thesis_change).should eq(thesis_change)
    end
  end

  describe "GET new" do
    it "assigns a new thesis_change as @thesis_change" do
      get :new, {}, valid_session
      assigns(:thesis_change).should be_a_new(ThesisChange)
    end
  end

  describe "GET edit" do
    it "assigns the requested thesis_change as @thesis_change" do
      thesis_change = ThesisChange.create! valid_attributes
      get :edit, {:id => thesis_change.to_param}, valid_session
      assigns(:thesis_change).should eq(thesis_change)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      it "creates a new ThesisChange" do
        expect {
          post :create, {:thesis_change => valid_attributes}, valid_session
        }.to change(ThesisChange, :count).by(1)
      end

      it "assigns a newly created thesis_change as @thesis_change" do
        post :create, {:thesis_change => valid_attributes}, valid_session
        assigns(:thesis_change).should be_a(ThesisChange)
        assigns(:thesis_change).should be_persisted
      end

      it "redirects to the created thesis_change" do
        post :create, {:thesis_change => valid_attributes}, valid_session
        response.should redirect_to(ThesisChange.last)
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved thesis_change as @thesis_change" do
        # Trigger the behavior that occurs when invalid params are submitted
        ThesisChange.any_instance.stub(:save).and_return(false)
        post :create, {:thesis_change => { "type_of_entity" => "invalid value" }}, valid_session
        assigns(:thesis_change).should be_a_new(ThesisChange)
      end

      it "re-renders the 'new' template" do
        # Trigger the behavior that occurs when invalid params are submitted
        ThesisChange.any_instance.stub(:save).and_return(false)
        post :create, {:thesis_change => { "type_of_entity" => "invalid value" }}, valid_session
        response.should render_template("new")
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested thesis_change" do
        thesis_change = ThesisChange.create! valid_attributes
        # Assuming there are no other thesis_changes in the database, this
        # specifies that the ThesisChange created on the previous line
        # receives the :update_attributes message with whatever params are
        # submitted in the request.
        ThesisChange.any_instance.should_receive(:update_attributes).with({ "type_of_entity" => "MyString" })
        put :update, {:id => thesis_change.to_param, :thesis_change => { "type_of_entity" => "MyString" }}, valid_session
      end

      it "assigns the requested thesis_change as @thesis_change" do
        thesis_change = ThesisChange.create! valid_attributes
        put :update, {:id => thesis_change.to_param, :thesis_change => valid_attributes}, valid_session
        assigns(:thesis_change).should eq(thesis_change)
      end

      it "redirects to the thesis_change" do
        thesis_change = ThesisChange.create! valid_attributes
        put :update, {:id => thesis_change.to_param, :thesis_change => valid_attributes}, valid_session
        response.should redirect_to(thesis_change)
      end
    end

    describe "with invalid params" do
      it "assigns the thesis_change as @thesis_change" do
        thesis_change = ThesisChange.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        ThesisChange.any_instance.stub(:save).and_return(false)
        put :update, {:id => thesis_change.to_param, :thesis_change => { "type_of_entity" => "invalid value" }}, valid_session
        assigns(:thesis_change).should eq(thesis_change)
      end

      it "re-renders the 'edit' template" do
        thesis_change = ThesisChange.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        ThesisChange.any_instance.stub(:save).and_return(false)
        put :update, {:id => thesis_change.to_param, :thesis_change => { "type_of_entity" => "invalid value" }}, valid_session
        response.should render_template("edit")
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested thesis_change" do
      thesis_change = ThesisChange.create! valid_attributes
      expect {
        delete :destroy, {:id => thesis_change.to_param}, valid_session
      }.to change(ThesisChange, :count).by(-1)
    end

    it "redirects to the thesis_changes list" do
      thesis_change = ThesisChange.create! valid_attributes
      delete :destroy, {:id => thesis_change.to_param}, valid_session
      response.should redirect_to(thesis_changes_url)
    end
  end

end
